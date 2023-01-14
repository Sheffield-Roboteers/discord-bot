/**
 * @file Uptime Command
 * @author Sam Piper
 * @version 1.0.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription(
			"Returns uptime of the bot!"
        ),

	async execute(interaction) {
		const { client } = interaction;
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
		await interaction.reply({ content: `__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`, ephemeral: true });
	},
};
