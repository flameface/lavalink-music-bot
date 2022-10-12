const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'disconnect',
  description: 'Disconnect the bot from your voice channel',
  userPermission: ["Administrator"],
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guildId);

    player.destroy();
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('📡 Disconnected the player');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
