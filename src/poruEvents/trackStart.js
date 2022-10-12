const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } = require('discord.js');
const ms = require('ms');

/**
 * @param {Client} client 
 */

module.exports.run = async (client, player, track) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('loop')
        .setEmoji(`🔁`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('volume-')
        .setEmoji(`🔉`)
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('p/p')
        .setEmoji(`▶`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('volume+')
        .setEmoji(`🔊`)
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('skip')
        .setEmoji(`⏭`)
        .setStyle(ButtonStyle.Secondary),
    );

  const embed = new EmbedBuilder()
    .setAuthor({
      name: `Now Playing`,
      iconURL: track.info.requester.displayAvatarURL(),
    })
    .setColor('Blue')
    .setDescription(
      `
      **Track**: [${track.info.title}](${track.info.uri})
      **Author**: ${track.info.author}
      **Source**: ${capitalizeFirstLetter(`${track.info.sourceName}`)}
      **Duration**: ${ms(track.info.length)}
`,
    )
    .setImage(track.info.image);

  const channel = client.channels.cache.get(player.textChannel)
  await channel?.send({ embeds: [embed], components: [row] })
};