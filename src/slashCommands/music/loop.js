const { EmbedBuilder, CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'loop',
  description: 'Set loop mode to current track',
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  /**
  * @param {Client} client 
  * @param {CommandInteraction} interaction
  */
  run: async (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);
    if (interaction.user.id !== player.currentTrack.info.requester.id)
      return interaction.reply({ content: `You are not allowed to use this command now as the song is played by another user`, ephemeral: true });

    const loop = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('track').setLabel('Loop Track').setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId('queue').setLabel('Loop Queue').setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId('disable').setLabel("Disable").setStyle(ButtonStyle.Danger)
      )

    const embed = new EmbedBuilder()
      .setImage('https://cdn.discordapp.com/attachments/863024911143927819/1023949603244085298/20220926_185728.png')
      .setColor("Blue")

    interaction.reply({
      embeds: [embed],
      components: [loop]
    })
  }
};
