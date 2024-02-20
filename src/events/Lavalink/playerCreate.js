const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, WebhookClient} = require("discord.js");
const { Webhooks: {player_create}, embedColor } = require('../../config.js');
const db = require("../../schema/setup");

module.exports = async (client, player) => {

  const web1 = new WebhookClient({ url: player_create }); 

    const server = client.guilds.cache.get(player.guild);
    const embed = new EmbedBuilder()
    .setColor(embedColor)
    .setAuthor({name:`Player Created`, iconURL: client.user.displayAvatarURL()})
    .setDescription(`**Server Id:** ${player.guild}\n**Server Name:** ${server.name}`)

    web1.send({embeds: [embed]})

	client.logger.log(`Player has been created in ${player.guild}`, "log");
	let guild = client.guilds.cache.get(player.guild);
	if (!guild) return;
	const data = await db.findOne({ Guild: guild.id });
	if (!data) return;

	let channel = guild.channels.cache.get(data.Channel);
	if (!channel) return;

	let message;

	try {

		message = await channel.messages.fetch({ message: data.Message, cache: true });

	} catch (e) { };

	if (!message) return;

	let pausebut = new ButtonBuilder().setCustomId(`pause_but_${guild.id}`).setEmoji({ name: "⏯️" }).setStyle(ButtonStyle.Secondary).setDisabled(false);

	let lowvolumebut = new ButtonBuilder().setCustomId(`lowvolume_but_${guild.id}`).setEmoji({ name: "🔉" }).setStyle(ButtonStyle.Secondary).setDisabled(false);

	let highvolumebut = new ButtonBuilder().setCustomId(`highvolume_but_${guild.id}`).setEmoji({ name: "🔊" }).setStyle(ButtonStyle.Secondary).setDisabled(false);

	let previousbut = new ButtonBuilder().setCustomId(`previous_but_${guild.id}`).setEmoji({ name: "⏮️" }).setStyle(ButtonStyle.Secondary).setDisabled(false);

	let skipbut = new ButtonBuilder().setCustomId(`skipbut_but_${guild.id}`).setEmoji({ name: "⏭️" }).setStyle(ButtonStyle.Secondary).setDisabled(false);

	const row1 = new ActionRowBuilder().addComponents([lowvolumebut, previousbut, pausebut, skipbut, highvolumebut]);

	await message.edit({ content: "__**Join a voice channel and queue songs by name/url.**__\n\n", components: [row1] }).catch(() => { });


}
