const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: "interactionCreate"
};

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.type == 2) return;

    const command = client.slash.get(interaction.commandName);
    const player = client.poru.players.get(interaction.guild.id);
    const memberChannel = interaction.member.voice.channelId;
    const botChannel = interaction.guild.members.me.voice.channelId;

    if (!command) return;

    try {
        if (command.userPermissions) {
            if (!interaction.member.permissions.has(PermissionsBitField.resolve(command.userPermissions || []))) return interaction.reply({
                content: `${interaction.member} You don't have the required permissions to use this command`,
                ephemeral: true
            }).then(setTimeout(() => interaction.deleteReply(), 5000))
        }

        if (command.botPermissions) {
            if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPermissions || []))) return interaction.reply({
                content: `${interaction.member} I don't have the required permissions to use this command`,
                ephemeral: true
            }).then(setTimeout(() => interaction.deleteReply(), 5000))
        };

        if (command.inVc && !memberChannel) {
            return interaction.reply(`**${interaction.member.displayName}** You must be in a Voice channel to use this command.`).then(setTimeout(() => interaction.deleteReply(), 5000))
        }

        if (command.sameVc && player && botChannel !== memberChannel) {
            return interaction.reply(`**${interaction.member.displayName}** You must be in the same Voice channel as mine to use this command.`).then(setTimeout(() => interaction.deleteReply(), 5000))
        }

        if (command.player && !player) {
            return interaction.reply(`**${interaction.member.displayName}** No player exists for this server.`).then(setTimeout(() => interaction.deleteReply(), 5000))
        }

        if (command.current && !player.currentTrack) {
            interaction.reply(`**${interaction.member.displayName}** There is nothing playing right now.`).then(setTimeout(() => interaction.deleteReply(), 5000))
        }

        await command.run(client, interaction, interaction.options)
    } catch (err) {
        console.log(err);
    }
})