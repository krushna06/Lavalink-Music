const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Show the current playing song.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription('**<:infolrmn:1174990719396610090> There Is No Music Playing**');
            return message.channel.send({ embeds: [thing] });
        }
        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;
        
        let embed = new EmbedBuilder()
          .setAuthor({ name: `Now Playing`})
          .setDescription(`**[${song.title}](https://discord.gg/2pkvB82NaS)**`)
          .addFields([{name:`Duration`, value: `${convertTime(song.duration)}`, inline: false},
                      {name: `Requester`, value: `[${song.requester.username}](
https://discord.com/users/${song.requester.id})`, inline: false }])
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `${convertTime(current)} ${progressbar(player)} ${convertTime(total)}`})
            .setColor(client.embedColor)
            return message.channel.send({embeds: [embed]})

    }
}
