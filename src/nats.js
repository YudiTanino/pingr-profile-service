const stan = require("node-nats-streaming");

module.exports = function (mongoClient) {
  const conn = stan.connect("test-cluster", "test", {
    url: process.env.BROKER_URL,
  });

  
  mongoClient.connect();
  const db = mongoClient.db()
  const usersCollection = db.collection("users")

  const userTopicSubsMap = {};
  
  conn.on("connect", async() => {
    console.log("Connected to NATS Streaming");
    
    const opts = conn.subscriptionOptions().setDeliverAllAvailable();
    const registeredUserSubs = conn.subscribe('users.registered', opts);

    registeredUserSubs.on('message', async (msg) => {
      console.log(`[${msg.getSequence()}] Received message: ${msg.getData()}`);

      const userCreatedMessage = JSON.parse(msg.getData());
      const { id: uuid } = userCreatedMessage;

      try{
        if(!await usersCollection.findOne({id: uuid}))
        {
          await usersCollection.insertOne({id: uuid})
        }
      } catch(err){

        return console.log(`Erro: ${err}`)
      }

      const userTopicName = `users.${uuid}`;
      const userTopicSubs = conn.subscribe(userTopicName, opts);
      userTopicSubsMap[uuid] = userTopicSubs;

      readUserUpdate(uuid, userTopicSubs)

      setDefaults(userTopicName)
      
    })
    
    const userTopicDeletedSubs = conn.subscribe("users.deleted", opts);

    readUserDeleted(userTopicDeletedSubs, userTopicSubsMap)

    function readUserUpdate(uuid, userTopicSubs)
    {
      userTopicSubs.on('message', async (msg) => {
        console.log(`[${msg.getSequence()}] Received message: ${msg.getData()}`);
  
  
        const userTopicMessage = JSON.parse(msg.getData());
        const { key, value } = userTopicMessage;
  
        try{
          await usersCollection.updateOne({id: uuid}, {$set: {[key]: value}});
        } catch{
          console.log("Erro")
        }
  
        console.log(`Field updated: ${key} = ${value}`);
      })
    }


    function setDefaults(userTopicName)
    {
      const userDefault = 
      {
        name: "fulano",
        public: true,
        creationDate: {
          day: "",
          month: "",
          year: ""
        },
        date: {
          day: "",
          month: "",
          year: ""
        },
        description: "",
        profilePictureUrl: "https://urlDefault.com",
        coverPictureUrl: "https://urlDefault2.com",
        location: ""
      }

      const publishToUserTopic = ([key, value]) => conn.publish(userTopicName, JSON.stringify({key, value}));

      Object.entries(userDefault).forEach(publishToUserTopic);
    }

    function readUserDeleted(userTopicDeletedSubs, userTopicSubsMap)
    {
      userTopicDeletedSubs.on('message', (msg) => {
        const userDeletedMessage = JSON.parse(msg.getData());
        const { id: uuid } = userDeletedMessage;
        console.log('UserDeleted:', uuid);
  
        try{
          userTopicSubsMap[uuid].unsubscribe(`users.${uuid}`);
          userTopicSubsMap[uuid].on("unsubscribed"), async() => {
            await usersCollection.deleteOne({id: uuid});
          }
        } catch(err){
          return console.log(`Erro: ${err}`)
        }
      })
    } 
  })
    
  return conn;
};
