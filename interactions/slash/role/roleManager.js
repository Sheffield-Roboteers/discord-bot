/**
 * @file Ping command
 * @author Sam Piper
 * @version 1.0.0
 */

// Deconstructed the constants we need in this file.

const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const { role_map } = require("../../../config.json");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription(
			"Manage your roles via a select menu!"
        ),

	async execute(interaction) {
		// Replies to the interaction!
        const { client } = interaction;
        // Dynamically build options from the emoji_role_map in config.json
        const options = [];
        for (const [key, value] of Object.entries(role_map)) {
            // Push an option to the options array
            options.push({
                label: key,
                description: `Toggle the ${key} role`,
                value: value,
            });
        }


        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('role_manage_select')
                .setPlaceholder('Nothing selected')
                .addOptions(
                    options
                )
        );
        // DM The user the select menu
        
        client.users.cache.get(interaction.user.id).send({ content: 'Select which role you want to toggle!', components: [row], ephemeral: false });
        interaction.reply({ content: 'Check your DMs!', ephemeral: true });
        setTimeout(() => interaction.deleteReply(), 5000);
	},
};
