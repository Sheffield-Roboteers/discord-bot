// Required requirements and constants
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const { token } = require('./config.json');
const myIntents = new Intents(14031);

// Create new client instance
const client = new Client({ intents: myIntents , partials:['MESSAGE', 'CHANNEL', 'REACTION']});

// Client Events
client.on('ready',c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on("warn", (info) => console.log(info));
client.on("error", (error) => console.log(error));

/** 
client.on('debug', function(info) {
    console.log(`debug -> ${info}`);
});
*/

client.on('messageCreate', async function(msg) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('approve')
                .setLabel('Approve Message')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('reject')
                .setLabel('Reject Message')
                .setStyle('DANGER')
        );

    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == "DM") {
        // Embed formatting
        const approveEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Anonymous Asked:')
        .addField('Message Content:', msg.content, true)
        .setTimestamp()

        // Getting the approve and sending channels
        const approb = client.channels.cache.get('904174714497433631');
        const public = client.channels.cache.get('904161643439734814');
        approb.send({embeds: [approveEmbed], components: [row]})
            .then(m => {
                const collector = m.createMessageComponentCollector({componentType: "BUTTON", time: 600000});
                collector.on('collect', async i => {
                    if (i.customId === 'approve') {
                        public.send({embeds: [approveEmbed]});
                        m.delete();
                    }else if (i.customId === 'reject') {
                        m.delete();
                    }
                })
            });
    }

});

//Login with token
client.login(token);