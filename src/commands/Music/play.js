const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { Player } = require("erela.js");

module.exports = {
  name: "play",
  category: "Music",
  aliases: ["p"],
  description: "Plays audio from any supported source.",
  args: true,
  usage: "Please Provide The \`<Song URL or Name>\` To Play",
  userPerms: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
      
      const youtube = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({name: `${client.user.username} Don't Support This Platform`})

//    if(message.content.includes(`youtu.be`))
//      return message.reply({embeds: [youtube] })
//     if(message.content.includes(`youtube.com`))
//      return message.reply({embeds: [youtube] })
//     else if(message.content.includes(`y2u.be`)) 
//      return message.reply({embeds: [youtube]}) 
      
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(["Speak", "Connect"])
      )
    )
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions to execute this command! Please give me permission to \`CONNECT\` or \`SPEAK\`.`
            ),
        ],
      });
    const { channel } = message.member.voice;
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.resolve(["Speak", "Connect"]))
    )
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions connect your VC! Please give me permission to \`CONNECT\` or \`SPEAK\`.`
            ),
        ],
      });
    /**
     * @type {Player}
     */
    let player = client.manager.get(message.guild.id);

    if (!player)
      player = await client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
        volume: 50,
      });

    if (player.state != "CONNECTED") await player.connect();
    const search = args.join(" ");
    let res;
    try {
      res = await player.search(search, message.author);
      if (!player)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
              .setDescription('**<:infolrmn:1174990719396610090> Nothing Is Playing Right Now**'),
          ],
        });
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(
        `There Was An Error While Searching: ${err.message}`
      );
    }
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
              .setDescription(`**No Results Found**`),
          ],
        });
      case "TRACK_LOADED":
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setAuthor({name: `Track Queued`})
            .setDescription(`[${track.title}](https://discord.gg/2pkvB82NaS) - [${convertTime(track.duration)}] - [${track.requester.username}](https://discord.com/users/${track.requester.id})`);
          return message.channel.send({ embeds: [thing] });
        }
      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);
        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          player.play();
        const thing = new EmbedBuilder()
          .setColor(client.embedColor)
          .setAuthor({name: `Playlist Queued`})
          .setDescription(`[${res.playlist.name}](https://discord.gg/2pkvB82NaS
) - [${convertTime(res.playlist.duration)}]`);
        return message.channel.send({ embeds: [thing] });
      case "SEARCH_RESULT":
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setAuthor({name: `Track Queued`})
            .setDescription(`[${track.title}](https://discord.gg/2pkvB82NaS
) - [${convertTime(track.duration)}]`);
          return message.channel.send({ embeds: [thing] });
        }
    }
  },
};
