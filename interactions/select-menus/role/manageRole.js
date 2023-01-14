/**
 * @file Role select menu handler.
 * @author Sam Piper
 * @since 1.0.0
 * @version 1.0.0
 */
const { bot_guild_id } = require("../../../config.json");
/**
 * @type {import('../../../typings').SelectInteractionCommand}
 */
module.exports = {
	id: "role_manage_select",

	async execute(interaction) {
        // Get the client
        const { client } = interaction;

        // Get the selected option
        const selectedRoleID = interaction.values[0];
        
        // Get the guild
        const guild = client.guilds.cache.get(bot_guild_id);

        // Get the guild member
        const member = guild.members.cache.get(interaction.user.id);

        // Get the role
        const role = guild.roles.cache.get(selectedRoleID);

        // Toggle the role
        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            await interaction.reply({
                content: `You have been removed from the ${role.name} role!`,
                ephemeral: true,
            });
        } else {
            await member.roles.add(role);
            await interaction.reply({
                content: `You have been added to the ${role.name} role!`,
                ephemeral: true,
            });
        }
        setTimeout(() => interaction.deleteReply().then(
            interaction.message.delete()
        ), 5000);
		return;
	},
};