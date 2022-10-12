const client = require('../../index');
const colors = require('colors');
const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready"
};

client.once('ready', async () => {
    client.poru.init(client);

    console.log(`[READY] ${client.user.tag} is up and ready to go.`.bold)
    console.log("----------------------------------------".white);

    setInterval(() => {
        const statuses = [`Music`];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: ActivityType.Listening });
    }, 60000);
})
