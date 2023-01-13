/**
 * @file Ask command used to ask questions anonymously
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
		.setName("ask")
		.setDescription(
			"The question you want to ask anonymously."
		)
		.addStringOption((option) =>
			option
				.setName("question")
				.setDescription("The question you want to ask.")
		),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let question = interaction.options.getString("question");

		if (question) {
			// 
		} else {
			// Reply to user only that there was an issue processing their command

		}

		// Replies to the interaction!

		await interaction.reply({
			embeds: [],
		});
	},
};
