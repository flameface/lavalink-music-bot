const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'Resumes the player',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });

    if (!player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('▶ The player is not paused');

      interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('▶ The player has been resumed');

      player.pause(false);
      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
