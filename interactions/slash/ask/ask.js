/**
 * @file Ask command used to ask questions anonymously
 * @author Sam Piper
 * @version 1.0.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { approve_channel_id } = require("../../../config.json");
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
		const {client} = interaction;
		let question = interaction.options.getString("question");
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('approve_button')
					.setLabel('Approve Message')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('reject_button')
					.setLabel('Reject Message')
					.setStyle(ButtonStyle.Danger));
		if (question) {
			const approveEmbed = new EmbedBuilder()
				.setColor('#0099ff')
				.setAuthor({name: 'Anonymous Said:'})
				.addFields({name: 'Message Content:' , value: question, inline: true})
				.setTimestamp();

			const approveChannel = client.channels.cache.get(approve_channel_id);
			approveChannel.send({ embeds: [approveEmbed], components: [row] })
			await interaction.reply({
				content: "Your question has been sent to the approval channel.",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "There was an issue processing your command.",
				ephemeral: true,
			});
		}
	},
};
