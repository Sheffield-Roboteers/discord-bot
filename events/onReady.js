/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

const { role_channel_id, role_message_id, emoji_role_map } = require("../config.json");
const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		console.log(`Goto: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);
		
		// Set the bot activity.
		client.user.setActivity("the Roboteers Arena", { type: ActivityType.Competing });
	},
};
