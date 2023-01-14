/**
 * @file Handles reject button on approve embeds.
 * @author Sam Piper
 * @version 1.0.0
 */

/**
 * @type {import('../../../typings').ButtonInteractionCommand}
 */
module.exports = {
	id: "reject_button",
	async execute(interaction) {
        await interaction.message.delete()
	},
};