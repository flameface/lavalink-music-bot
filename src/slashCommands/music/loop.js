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

    const enable = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('enable').setLabel('Loop Enable').setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId('track').setLabel('Loop Track').setStyle(ButtonStyle.Primary).setDisabled(true),

        new ButtonBuilder()
          .setCustomId('queue').setLabel('Loop Queue').setStyle(ButtonStyle.Primary).setDisabled(true)
      )

    const disable = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('disable').setLabel('Loop Disable').setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
          .setCustomId('track').setLabel('Loop Track').setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId('queue').setLabel('Loop Queue').setStyle(ButtonStyle.Primary)
      )

    const enableembed = new EmbedBuilder()
      .setImage('https://cdn.discordapp.com/attachments/863024911143927819/1023949603244085298/20220926_185728.png')
      .setColor("Blue")

    const collector = interaction.channel.createMessageComponentCollector({ filter: (i) => (i?.isButton()) && i?.user && i?.message.author.id == client.user.id, time: 60000 });

    interaction.reply({
      embeds: [enableembed],
      components: [enable]
    })

    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

      if (i.customId === 'enable') {
        const embed = new EmbedBuilder()
          .setImage('https://cdn.discordapp.com/attachments/863024911143927819/1023949603244085298/20220926_185728.png')
          .setColor("Blue")

        i.update({
          embeds: [embed],
          components: [disable]
        })
      }

      if (i.customId === 'disable') {
        player.setLoop("NONE")
        const embed = new EmbedBuilder()
          .setImage('https://cdn.discordapp.com/attachments/863024911143927819/1023949603244085298/20220926_185728.png')
          .setColor("Blue")

        i.update({
          embeds: [embed],
          components: [enable]
        })
      }

      if (i.customId === 'track') {
        player.setLoop("TRACK")

        const embed = new EmbedBuilder()
          .setDescription(`🔄 **${interaction.member.displayName}** Switched to Track Loop Mode`)
          .setColor(`Blue`)

        i.reply({
          embeds: [embed]
        }).then(setTimeout(() => i.deleteReply(), 5000))
      }

      if (i.customId === 'queue') {
        player.setLoop("QUEUE")

        const embed = new EmbedBuilder()
          .setDescription(`🔄 **${interaction.member.displayName}** Switched to Queue Loop Mode`)
          .setColor(`Blue`)

        i.reply({
          embeds: [embed]
        }).then(setTimeout(() => i.deleteReply(), 5000))
      }
    })
  }
};
