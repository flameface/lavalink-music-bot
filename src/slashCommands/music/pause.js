const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'pause the player',
  inVc: true,
  sameVc: true,
  player: true,
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    if (player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('Player is already paused');

      return interaction.reply({
        embeds: [embed],
      });
    }

    player.pause(true);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription('Paused the player');

    return interaction.reply({
      embeds: [embed],
    });
  },
};
