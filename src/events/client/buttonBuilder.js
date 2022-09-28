const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: "buttonBuilder"
};

client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;
    const player = client.poru.players.get(interaction.guild.id);

    if (interaction.customId === 'controlpanel') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('shuffle')
                    .setEmoji(`🔀`)
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
            .setImage('https://cdn.discordapp.com/attachments/863024911143927819/1023855766655991858/20220926_124630.png')

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    }

    if (interaction.customId === "shuffle") {
        try {
            if (player.queue.length <= 2) {
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription("🔀 Can't shuffle the queue.");
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }

            player.queue.shuffle();

            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setDescription('🔀 Shuffled the queue');

            interaction.reply({ embeds: [embed], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'volume-') {
        try {
            player.setVolume("10");
            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setDescription(`🔉 Volume has been set to **10%**.`);
            return interaction.reply({ embeds: [embed], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'volume+') {
        try {
            player.setVolume("100");
            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setDescription(`🔊 Volume has been set to **100%**.`);
            return interaction.reply({ embeds: [embed], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'p/p') {
        try {
            if (player.isPaused) {
                player.pause(false);
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription('⏸ The player has been resumed');

                interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                player.pause(true);

                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription('⏸ The player has been paused');

                interaction.reply({ embeds: [embed], ephemeral: true })
            }
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'skip') {
        try {
            player.stop();

            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setDescription('⏭ Skipped the current track');

            await interaction.reply({ embeds: [embed], components: [], ephemeral: true })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }
})