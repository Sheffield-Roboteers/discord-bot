/**
 * @file Ping command
 * @author Sam Piper
 * @version 1.0.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription(
			"Replies with pong!"
        ),

	async execute(interaction) {
		// Replies to the interaction!
		await interaction.reply("Pong!");
	},
};
