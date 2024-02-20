const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "stop",
  category: "Music",
  description: "Stops the music.",
  args: false,
  usage: "",
  userPerms: [],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription('**<:infolrmn:1174990719396610090> There Is No Music Playing**')
      return message.reply({ embeds: [thing] });
    }

    const autoplay = player.get("autoplay");
    if (autoplay) {
      player.set("autoplay", false);
    }

    if (!player.twentyFourSeven) {
        await player.destroy();
    } else {
        await player.stop();
    }

    return message.react(`<a:moodiscord:1171191481793515581>`);
  },
};
