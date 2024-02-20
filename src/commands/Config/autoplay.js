const { EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require("discord.js");

module.exports = {
  name: "autoplay",
  aliases: ["ap"],
  category: "Config",
  description: "Toggle music autoplay.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
      
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      
    const player = client.manager.get(message.guild.id);

    const autoplay = player.get("autoplay");

    const emojireplay = client.emoji.autoplay;

    if (!player.queue.current) {
      const embed = new EmbedBuilder()
      .setColor(client.embedColor)
        .setDescription("**<:infolrmn:1174990719396610090> Please Play A Song Before Using This Command.**");
    
      return message.reply({ embeds: [embed] });
    }
    
    const uri = player.queue.current.uri;
    if (!(uri.includes("youtube.") || uri.includes("youtu.be"))) {
      const embed = new EmbedBuilder()
      .setColor(client.embedColor)
        .setDescription("**<:infolrmn:1174990719396610090> The Autoplay feature is currently not available for this source.**");
    
      return message.reply({ embeds: [embed] });
    }

    if (autoplay) {
      player.set("autoplay", false);
      let keplermusic = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription('**<:musik:1175104383969656922> Autoplay Is Now Disabled (OFF)**')
      return message.channel.send({ embeds: [keplermusic] });
    } else {
      const identifier = player.queue.current.identifier;
      player.set("autoplay", true);
      player.set("requester", client.user);
      player.set("identifier", identifier);
      const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
      const res = await player.search(search, message.author);
      player.queue.add(
        res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 1]
      );
      let keplermusic2 = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription('**<:musik:1175104383969656922> Autoplay Is Now Enabled (ON)**')

      return message.channel.send({ embeds: [keplermusic2] });
    }
  },
};
