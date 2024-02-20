const { EmbedBuilder, Message, Client, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { afk } = require("../../utils/afk");
const db = require("../../schema/prefix.js");
const db2 = require("../../schema/dj");
const db3 = require("../../schema/setup");
const moment = require("moment");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {
      if (message.author.bot) return;
        const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id);
    if (data) {
      const [timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow();
      message.reply(
        `<@${mentionedMember.user.id}> is currently afk (${timeAgo}) - **${reason}**`
      );
    }
  }
  const getData = afk.get(message.author.id);
  if (getData) {
    afk.delete(message.author.id);
    message.reply(`Welcome Back <@${message.author.id}>, I have removed your AFK`);
  }
      let prefix = client.prefix;
    const channel = message?.channel;
    const ress = await db.findOne({ Guild: message.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;

      const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); 
              if (message.content.match(mentionRegex)) {

                var support = client.config.links.support;
                var website = client.config.links.website;

          const keplermusic = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Website")
                .setEmoji("<:webs:1175007082517364747>")
                .setStyle(ButtonStyle.Link)
                .setURL(website)
        )
        .addComponents(
            new ButtonBuilder()
                .setLabel("Support")
                .setEmoji("<:supportlrmn:1175006362862882826>")
                .setStyle(ButtonStyle.Link)
                .setURL(support)
        );
              
            const embed = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({
                    name: `${client.user.username}`,
                    url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`,
                    iconURL: client.user.displayAvatarURL({ dynamic: true })
                  })
            .setFooter({text: `Thanks For using ${client.user.username}, Love From Bogor, Indonesia.`})
            .setDescription(`Hey **<@${message.author.id}>**, **\nPrefix for this server is** \`${prefix}\`, **If you want more info, then do** \`${prefix}\`**help**\n\n**Stay safe and healthy, rest and take a break when you need one. Wish you all the best Hope you have a lovely day.**`);
            message.channel.send({ embeds: [embed], components: [keplermusic] })
        };

  let noprefix = await client.db.get(`noprefix_${message.author.id}`);
      
if (noprefix &&
      !message.content.startsWith(prefix)) prefix = "";
   
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('SendMessages'))) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ViewChannel'))) return;

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks'))) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        const embed = new EmbedBuilder()
            .setColor(client.embedColor)

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply = `${command.usage}`;
            }

            embed.setDescription(reply);
            return message.channel.send({ embeds: [embed] });
        }

        if (command.botPerms) {
            if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                embed.setDescription(`I don't have **\`${command.botPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
        if (command.userPerms) {
            if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                embed.setDescription(`You don't have **\`${command.userPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
        
        if (command.owner) {
      if (client.owner) {
        const devs = client.owner.find((x) => x === message.author.id);
        if (!devs)
          return message.channel.send({
            embeds: [embed.setDescription('Only <@!742457036914294855> Can Use this Command')],
          });
      }
    }

        const player = message.client.manager.get(message.guild.id);

        if (command.player && !player) {
            embed.setAuthor({name:`There Is No Players In This Server`});
            return message.channel.send({ embeds: [embed] });
        }

        if (command.inVoiceChannel && !message.member.voice.channelId) {
            embed.setAuthor({name:`You Must Be In The Voice Channel To Use This Command`});
            return message.channel.send({ embeds: [embed] });
        }

        if (command.sameVoiceChannel) {
            if (message.guild.members.me.voice.channel) {
                if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
                    embed.setAuthor({name:`You Must Be In The Same Channel As ${client.user.username}`});
                    return message.channel.send({ embeds: [embed] });
                }
            }
        }
        if (command.dj) {
            let data = await db2.findOne({ Guild: message.guild.id })
            let perm = 'MuteMembers';
            if (data) {
                if (data.Mode) {
                    let pass = false;
                    if (data.Roles.length > 0) {
                        message.member.roles.cache.forEach((x) => {
                            let role = data.Roles.find((r) => r === x.id);
                            if (role) pass = true;
                        });
                    };
                    if (!pass && !message.member.permissions.has(perm)) return message.channel.send({ embeds: [embed.setAuthor({name:`You Don't Have Enough Permissions To Use This Command`})] })
                };
            };
        }

        try {
            command.execute(message, args, client, prefix);
        } catch (error) {
            console.log(error);
            embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
            return message.channel.send({ embeds: [embed] });
        }
    }
};
