const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'pause the player',
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });

    if (player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('⏸ The player is already paused');

      return interaction.reply({
        embeds: [embed],
      });
    }

    player.pause(true);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('⏸ The player has been paused');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
