const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

module.exports = function (corsOptions, { stanConn, mongoClient, secret }) {

  function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    
    return url.protocol === "http:" || url.protocol === "https:";
  }
    
  const api = express();

  api.use(express.json());
  api.use(cors(corsOptions));

  api.get("/", (req, res) => res.json("Hello, World!"));

  api.patch("/users/:id", async (req, res) => {
    var isReqValid = true;
    const header = req.headers;
    
    if(!header.authentication){
      isReqValid = false;
      return res.status(401).json({
        "error": "Access Token not found",
      });
    };
    
    const token = jwt.decode(header.authentication.split(" ")[1]);
    
    if(token.id !== req.params.id){
      isReqValid = false;
      res.status(403).json({
        "error": "Access Token did not match User ID",
      });
    };

    if(isReqValid) {
      const profileData = req.body;
      
      const propertyTypes = {
        "name": "string",
        "public": "boolean",
        "birthdate": "object",
        "description": "string",
        "profilePictureUrl": "string",
        "profileCoverUrl": "string",
        "location": "string"
      };

      const validKeys = Object.keys(propertyTypes);

      const testLength = ([min, max], property) => property >= min && property <= max;

      const testDate = ({day, month, year}) => (
        (day === undefined || testLength([1, 31], day)) &&
        (month === undefined || testLength([1, 12], month)) &&
        (year === undefined || testLength([1, Number.MAX_SAFE_INTEGER], year))
      );

      const propertyValidations = {
        "name": (prop) => testLength([1, 128], prop.length),
        "public": () => true,
        "birthdate": (prop) => testDate(prop),
        "description": (prop) => testLength([0, 140], prop.length),
        "profilePictureUrl": isValidHttpUrl,
        "profileCoverUrl": isValidHttpUrl,
        "location": (prop) => testLength([0, 30], prop.length)
      };
      
      const updatedProperties = {};

      for(let k of validKeys){
        if(profileData.hasOwnProperty(k)){
          updatedProperties[k] = profileData[k];
        }
      }

      for(let k in updatedProperties){
        if(typeof updatedProperties[k] !== propertyTypes[k] || !propertyValidations[k](updatedProperties[k])){
          return res.status(400).json({"error": `Request body had malformed field ${k}`});
        }
      }

      try{
        for(let k in updatedProperties){
          const msgContent = {
            "key": k,
            "value": updatedProperties[k]
          };
          const guid = await stanConn.publish(`users.${token.id}`, JSON.stringify(msgContent));
          console.log('Published successfully with guid: ' + guid);
        }
      } catch(err){
        console.log('Publish error: ' + err);
      } 
      res.status(200).json({"profile": updatedProperties})
    }
  })

  return api;
};
