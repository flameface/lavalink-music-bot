const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clearqueue',
  description: 'Clears the queue',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });

    if (!player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('🆑 The queue is empty');

      return interaction.reply({
        embeds: [embed],
      });
    }

    const { length } = player.queue;
    player.queue.clear();

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`🆑 Cleared ${length} track from queue`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
