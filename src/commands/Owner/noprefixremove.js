const { Discord } = require("discord.js")
const { EmbedBuilder } = require("discord.js");
const keplermusic = ["742457036914294855", "926230907814309928"]

module.exports = {
    name: "noprefixremove",
    aliases: ["npremove","rnp"],
    category: "Owner",
    args: true,
    description: "",
    args: false,
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

  if(!keplermusic.includes(message.author.id)) return
        
  const embed = new EmbedBuilder()
  .setColor(client.embedColor)
  if(args[0]){
  try {
    await client.users.fetch(args[0])
  } catch (error) {
    return message.channel.send({embeds: [embed.setDescription(`Invalid User Id`)]});
  }
  const use = await client.db.get(`noprefix_${args[0]}`)
  if(!use){
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Is Not In My No Prefix List`)]})
  }
  await client.db.delete(`noprefix_${args[0]}`)
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Has Been Removed From No Prefix List`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`Please Give The User Id`)]})
    }
}