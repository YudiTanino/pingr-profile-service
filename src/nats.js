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
      
    });

    const friendsFollowedSubs = conn.subscribe("friends.follow", opts);
    friendsFollowedSubs.on('message', async (msg) => {
      console.log(`[${msg.getSequence()}] Received message: ${msg.getData()}`);

      const userFollowedMessage = JSON.parse(msg.getData());
      const { follower, following, type } = userFollowedMessage;

      if(type !== 'user') return;
      try {
        await usersCollection.updateOne({id: follower}, {$inc: {followingNumber: 1}});
        await usersCollection.updateOne({id: following}, {$inc: {followersNumber: 1}});
      } catch(err) {
        console.log(`Erro: ${err}`)
      }

    })

    const friendsUnfollowedSubs = conn.subscribe("friends.unfollow", opts);
    friendsUnfollowedSubs.on('message', async (msg) => {
      console.log(`[${msg.getSequence()}] Received message: ${msg.getData()}`);

      const userUnfollowedMessage = JSON.parse(msg.getData());
      const { follower, following, type } = userUnfollowedMessage;

      if(type !== 'user') return;
      try {
        await usersCollection.updateOne({id: follower}, {$dec: {followingNumber: 1}});
        await usersCollection.updateOne({id: following}, {$dec: {followersNumber: 1}});
      } catch(err) {
        console.log(`Erro: ${err}`)
      }

    })

    const userTopicDeletedSubs = conn.subscribe("users.deleted", opts);

    readUserDeleted(userTopicDeletedSubs, userTopicSubsMap)

    function readUserUpdate(uuid, userTopicSubs){

      userTopicSubs.on('message', async (msg) => {
        console.log(`[${msg.getSequence()}] Received message: ${msg.getData()}`);
  
  
        const userTopicMessage = JSON.parse(msg.getData());
        const { key, value } = userTopicMessage;
  
        try{
          await usersCollection.updateOne({id: uuid}, {$set: {[key]: value}});
        } catch(err){
          console.log("Erro", err)
        }
  
        console.log(`Field updated: ${key} = ${value}`);
      })
    }


    function setDefaults(userTopicName){
      
      const creationDate = new Date()

      const userDefault = 
      {
        name: "fulano",
        public: true,
        creationDate: {
          day: creationDate.getDate(),
          month: creationDate.getMonth()+1,
          year: creationDate.getFullYear()
        },
        birthdate: {
          day: null,
          month: null,
          year: null
        },
        description: "",
        profilePictureUrl: "https://urlDefault.com",
        coverPictureUrl: "https://urlDefault2.com",
        location: ""
      }

      const publishToUserTopic = ([key, value]) => conn.publish(userTopicName, JSON.stringify({key, value}));

      Object.entries(userDefault).forEach(publishToUserTopic);
    }

    function readUserDeleted(userTopicDeletedSubs, userTopicSubsMap){

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
