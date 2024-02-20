const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  category: "Music",
  description: "Skip the song currently playing.",
  args: false,
  usage: "",
  userPerms: [],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription('**<:infolrmn:1174990719396610090> There Is No Music Playing**')
      return message.reply({ embeds: [thing] });
    }
    const song = player.queue.current;

    player.stop();

    await message.react(`<a:moodiscord:1171191481793515581>`)
  },
};
