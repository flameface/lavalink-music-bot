const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Sets the volume of the player',
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'volume',
      description: 'The volume which you want to set',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
      max_value: 100,
    },
  ],
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });
    const volume = interaction.options.getNumber('volume', true);
    player.setVolume(volume);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(`Volume has been set to **${volume}%**.`);

    interaction.reply({
      embeds: [embed],
    });
  },
};
