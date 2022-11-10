// Required requirements and constants
const fs = require('node:fs');
const path = require('node:path');
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Collection} = require('discord.js');
const config = require('./config.json');
const myIntents = new Intents(32767);

// Create new client instance
const client = new Client({ intents: myIntents , partials:['MESSAGE', 'CHANNEL', 'REACTION']});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Client Events
client.on('ready', c => onReady(c));
client.on('messageReactionAdd', addRole);
client.on('messageReactionRemove', removeRole);
client.on("warn", (info) => console.log(info));
client.on("error", (error) => console.log(error));


/**
 * 'ready' event handler for discord.js client
 * find the first message in the specified channel and save it for later
 */
 async function onReady(c) {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    client.user.setActivity(`/help | ${client.user.username}`, { type: "PLAYING" })
    const channel = client.channels.cache.find((channel) => channel.id === config.roleChannel);
    // channel will not contain messages after it is found
    try {
      await channel.messages.fetch();
    } catch (err) {
      console.error('Error fetching channel messages', err);
      return;
    }

    let msg = channel.messages.cache.last();
    
    if(config.reactMessage === msg.id) {
        msg.react("✈️");
        msg.react("🖨️");
        msg.react("🪲");
        msg.react("🐜");
        msg.react("<:robopadroleicon:1038255900714074173>");
        console.log(`Watching message '${msg.id}' for reactions...`);
    } else {
        console.log(`Message not found`);
    }
  }
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    const command = interaction.client.commands.get(interaction.commandName);
  
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });

client.on('messageCreate', async function(msg) {
    if (msg.author.bot) {
        return;
    }
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
    if (msg.channel.type == "DM") {
        // Embed formatting
        const approveEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Anonymous Said:')
        .addField('Message Content:', msg.content, true)
        .setTimestamp()

        // Getting the approve and sending channels
        const approveChannel = client.channels.cache.get(config.approveChannel);
        const publicChannel = client.channels.cache.get(config.sendChannel);
        approveChannel.send({embeds: [approveEmbed], components: [row]})
            .then(m => {
                const collector = m.createMessageComponentCollector({componentType: "BUTTON"});
                collector.on('collect', async i => {
                    if (i.customId === 'approve') {
                        publicChannel.send({embeds: [approveEmbed]});
                        m.delete();
                    }else if (i.customId === 'reject') {
                        m.delete();
                    }
                })
            });
    }

});

/**
 * add a role to a user when they add reactions to the configured message
 * @param {Object} reaction - the reaction that the user added
 * @param {Objext} user - the user that added a role to a message
 */
 async function addRole({message, _emoji}, user) {
    if (user.bot || message.id !== config.reactMessage) {
      return;
    }
  
    // partials do not guarantee all data is available, but it can be fetched
    // fetch the information to ensure everything is available
    // https://github.com/discordjs/discord.js/blob/master/docs/topics/partials.md
    if (message.partial) {
      try {
        await message.fetch();
      } catch (err) {
        console.error('Error fetching message', err);
        return;
      }
    }

    if (config.emojiRoleMap[_emoji] === undefined) {
      message.reactions.cache.find(reaction => reaction.emoji == _emoji).users.remove(user.id);
      return;
    }
  
    const { guild } = message;
  
    const member = guild.members.cache.get(user.id);
    const role = guild.roles.cache.find((role) => role.id === config.emojiRoleMap[_emoji]);
  
    if (!role) {
      console.error(`Role not found for '${_emoji.name}'`);
      return;
    }
    
    try {
      member.roles.add(role.id);
    } catch (err) {
      console.error('Error adding role', err);
      return;
    }
  }
  
  /**
   * remove a role from a user when they remove reactions from the configured message
   * @param {Object} reaction - the reaction that the user added
   * @param {Objext} user - the user that added a role to a message
   */
  async function removeRole({message, _emoji}, user) {
    if (user.bot || message.id !== config.reactMessage) {
      return;
    }
  
    // partials do not guarantee all data is available, but it can be fetched
    // fetch the information to ensure everything is available
    // https://github.com/discordjs/discord.js/blob/master/docs/topics/partials.md
    if (message.partial) {
      try {
        await message.fetch();
      } catch (err) {
        console.error('Error fetching message', err);
        return;
      }
    }
  
    const { guild } = message;
  
    const member = guild.members.cache.get(user.id);
    const role = guild.roles.cache.find((role) => role.id === config.emojiRoleMap[_emoji]);
  
    if (!role) {
      console.error(`Role not found for '${_emoji.name}'`);
      return;
    }
  
    try{
      member.roles.remove(role.id);
    } catch (err) {
      console.error('Error removing role', err);
      return;
    }
}

//Login with token
client.login(config.token);