const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Skips the current track',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });
    player.stop();

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('Skipped the current track');

    interaction.reply({ embeds: [embed] });
  },
};
