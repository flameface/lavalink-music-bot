const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Shuffle the queue',
  userPermission: ["Administrator"],
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    if (player.queue.length <= 2) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription("Can't shuffle the queue.");
      return interaction.reply({ embeds: [embed] });
    }

    player.queue.shuffle();

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('Shuffled the queue');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
