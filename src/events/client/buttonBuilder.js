const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('../../index');

module.exports = {
    name: "buttonBuilder"
};

client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;

    const player = client.poru.players.get(interaction.guild.id);

    if (interaction.customId === "loop") {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

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
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'volume-') {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

            if (player.volume < 20) {
                player.setVolume(10)
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`🔉 Volume has been set to **${player.volume}%**`);
                interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                player.setVolume(player.volume - 10);
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`🔉 Volume has been set to **${player.volume}%**`);
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }

        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'volume+') {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

            if (player.volume > 90) {
                player.setVolume(100)
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`🔉 Volume has been set to **${player.volume}%**`);
                interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                player.setVolume(player.volume + 10);
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`🔊 Volume has been set to **${player.volume}%**`);
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'p/p') {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

            if (player.isPaused) {
                player.pause(false);
                const embed = new EmbedBuilder()

                    .setColor('Blue')
                    .setDescription('▶ The player has been resumed');

                interaction.reply({ embeds: [embed] })
            } else {
                player.pause(true);

                const embed = new EmbedBuilder()

                    .setColor('Blue')
                    .setDescription('⏸ The player has been paused');

                interaction.reply({ embeds: [embed] })
            }
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'skip') {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

            player.stop();

            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setDescription('⏭ Skipped the current track');

            await interaction.reply({ embeds: [embed] })
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'track') {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

            player.setLoop("TRACK")

            const embed = new EmbedBuilder()
                .setDescription(`🔄 Switched to track loop mode`)
                .setColor(`Blue`)

            interaction.reply({
                embeds: [embed]
            }).then(setTimeout(() => interaction.deleteReply(), 5000))
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'queue') {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

            player.setLoop("QUEUE")

            const embed = new EmbedBuilder()
                .setDescription(`🔄 Switched to queue loop mode`)
                .setColor(`Blue`)

            interaction.reply({
                embeds: [embed]
            }).then(setTimeout(() => interaction.deleteReply(), 5000))
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }

    if (interaction.customId === 'disable') {
        try {
            if (interaction.user.id !== player.currentTrack.info.requester.id)
                return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });

            player.setLoop("NONE")

            const embed = new EmbedBuilder()
                .setDescription('⭕ Loop has been disabled')
                .setColor("Blue")

            interaction.reply({
                embeds: [embed]
            }).then(setTimeout(() => interaction.deleteReply(), 5000))
        } catch {
            interaction.reply({ content: `**${interaction.member.displayName}** No player exists for this server.`, ephemeral: true })
        }
    }
})
