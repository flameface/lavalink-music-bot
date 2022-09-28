const { readdirSync } = require('fs');
const colors = require('colors')

module.exports = (client) => {
    console.log("----------------------------------------".yellow);
    const commands = readdirSync(
        __dirname.replace('handlers', 'poruEvents'),
    ).filter((file) => file.endsWith('.js'));

    for (const file of commands) {
        try {
            const pull = require(`${__dirname.replace(
                'handlers',
                'poruEvents',
            )}/${file}`);

            if (pull.event && typeof pull.event !== 'string') {
                console.log(`[HANDLER - MUSIC] Property event should be string : ${file}`.red)
                continue;
            }

            pull.event = pull.event || file.replace('.js', '');

            client.poru.on(pull.event, pull.run.bind(null, client));

            console.log(`[HANDLER - MUSIC] Loaded a file : ${file}`.blue)
        } catch (err) {
            console.log(`[HANDLER - MUSIC] Error while loading poru event: ${file}`.red);
            console.log(err)
        }
    }
};
