const stan = require("node-nats-streaming");

module.exports = function (mongoClient) {
  const conn = stan.connect("test-cluster", "test", {
    url: process.env.BROKER_URL,
  });

  const userTopicSubsMap = {};

  conn.on("connect", () => {
    console.log("Connected to NATS Streaming");

    const opts = conn.subscriptionOptions().setStartWithLastReceived();
    const createdUserSubs = conn.subscribe('users.created', opts);

    createdUserSubs.on('message', (msg) => {
      console.log(`[${msg.getSequence()}] Received message: ${msg.getData()}`);

      const userCreatedMessage = JSON.parse(msg.getData());
      const { id } = userCreatedMessage;
      
      /* Criar usuário no MongoDB */
      
      const userTopicName = `users.${id}`;
      
      const userTopicSubs = conn.subscribe(userTopicName, opts);
      
      userTopicSubsMap[id] = userTopicSubs;

      userTopicSubs.on('message', (msg) => {
        console.log(`[${msg.getSequence()}] Received message: ${msg.getData()}`);

        const userTopicMessage = JSON.parse(msg.getData());
        const { key, value } = userTopicMessage;

        /* Alterar usuário no MongoDB */

        console.log(`Field updated: ${key} = ${value}`);
      })
    })

    const userTopicDeletedSubs = conn.subscribe("users.deleted", opts);

    userTopicDeletedSubs.on('message', (msg) => {
      const userDeletedMessage = JSON.parse(msg.getData());
      const { id } = userDeletedMessage;
      console.log('UserDeleted:', id);

      /* Deletar usuário no MongoDB */

      userTopicSubsMap[id].unsubscribe(`users.${id}`);
    })    
  });

  return conn;
};
