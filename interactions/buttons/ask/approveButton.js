/**
 * @file Handles approve button on approve embeds.
 * @author Sam Piper
 * @version 1.0.0
 */

const { EmbedBuilder} = require("discord.js");
const { send_channel_id } = require("../../../config.json");

/**
 * @type {import('../../../typings').ButtonInteractionCommand}
 */
module.exports = {
	id: "approve_button",
	async execute(interaction) {
        const {client} = interaction;
        // Message content field from the embed should always be the first field.
        let content = interaction.message.embeds[0].fields[0].value;
        const sendEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setAuthor({name: 'Anonymous Said:'})
        .addFields({name: 'Message Content:' , value: content, inline: true})
        .setTimestamp();

        const sendChannel = client.channels.cache.get(send_channel_id);
        sendChannel.send({ embeds: [sendEmbed] })
        await interaction.message.delete()
	},
};