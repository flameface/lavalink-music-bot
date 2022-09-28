const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'Resumes the player',
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);


    if (!player.isPaused) {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('Player is not paused');

      interaction.reply({
        embeds: [embed],
      });
    } else {
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription('Resumed the player');

      player.pause(false);
      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
