
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, WebhookClient, AttachmentBuilder} = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { trackStartEventHandler } = require("../../utils/functions");
const { musicCard } = require("musicard"); // Import
const { Webhooks: { player_create } } = require('../../config.js');
const db = require("../../schema/setup");
module.exports = async (client, player, track, payload) => {

  const web1 = new WebhookClient({ url: player_create });

  const server = client.guilds.cache.get(player.guild);
  const embed2 = new EmbedBuilder()
    .setColor(client.embedColor)
    .setAuthor({ name: `Player Started`, iconURL: client.user.displayAvatarURL() })
    .setDescription(`**Server Id:** ${player.guild}\n**Server Name:** ${server.name}`)

  web1.send({ embeds: [embed2] })

  let guild = client.guilds.cache.get(player.guild);
  if (!guild) return;
  let channel = guild.channels.cache.get(player.textChannel);
  if (!channel) return;
  let data = await db.findOne({ Guild: guild.id });
  if (data) {
    if (!data.Channel) data.Channel = channel.id;

    let textChannel = guild.channels.cache.get(data.Channel);
    console.log(data.Channel + "" + textChannel);
    if (!textChannel) {
      try {
        textChannel = await guild.channels.fetch(data.Channel);
      } catch {
        channel.send("Please run /setup as I am unable to find the channel");
        textChannel = channel;
      }
    }

    const id = data.Message;
    if (channel.id === textChannel.id) {
      return await trackStartEventHandler(
        id,
        textChannel,
        player,
        track,
        client
      );
    } else {
      await trackStartEventHandler(id, textChannel, player, track, client);
    }
  }

  const queue = player.get("dcQ");

  let trackTitle = track?.title ?? queue.title;
  trackTitle = trackTitle.length > 20 ? trackTitle.substring(0, 17) + "..." : trackTitle;
  
  const card = new musicCard()
    .setName(String(trackTitle))
    .setAuthor(String(track.author))
    .setColor("auto")
    .setTheme("classic")
    .setBrightness(50)
    .setThumbnail(track.thumbnail)
    .setRequester(track.requester.username);
  
  const cardBuffer = await card.build();
  
  const attachment = new AttachmentBuilder(cardBuffer, {
    name: "moo.png",
  });
  
  const thing = new EmbedBuilder()
  //  .setAuthor({ name: `Currently Playing` })
  //  .setDescription(`**[${track.author} - ${trackTitle.toUpperCase()}](https://discord.gg/2pkvB82NaS)**`)
   .setImage("attachment://moo.png")
    .setColor(client.embedColor)
   // .setFooter({ text: `Request by: ${track.requester.username} | Duration: ${convertTime(track?.duration ?? queue.duration)}` });
  
  // Jika Anda ingin menampilkan avatar requester di footer:
  // .setFooter({ text: `Duration: ${convertTime(track?.duration ?? queue.duration)}`, iconURL: track.requester.displayAvatarURL() });
  
  // Tambahkan embed ke pesan atau kirim ke Discord
  // message.channel.send({ embed: thing });

  
  const keplermusic1 = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji('1123583072013664266')
    .setStyle(ButtonStyle.Secondary);
  const keplermusic2 = new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji('1123583308673073192')
    .setStyle(ButtonStyle.Secondary);
  const keplermusic3 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji('1123583149348237372')
    .setStyle(ButtonStyle.Secondary);
  const keplermusic4 = new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji('1123574557706567771')
    .setStyle(ButtonStyle.Success);
  const keplermusic5 = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji('1123583416709947453')
    .setStyle(ButtonStyle.Danger);
  const keplermusic6 = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji('1123583072013664266')
    .setStyle(ButtonStyle.Secondary);
  const keplermusic7 = new ButtonBuilder()
    .setCustomId("resume")
    .setEmoji('1123583259687792711')
    .setStyle(ButtonStyle.Success);
  const keplermusic8 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji('1123583149348237372')
    .setStyle(ButtonStyle.Secondary);
  const keplermusic9 = new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji('1123574557706567771')
    .setStyle(ButtonStyle.Success);
  const keplermusic10 = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji('1123583416709947453')
    .setStyle(ButtonStyle.Danger);

  const keplermusicfilter = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("filter_pop")
        .setPlaceholder('Select Filter')
        .addOptions([
          {
            label: 'Reset Filters',
            value: 'clear_but'
          },
          {
            label: 'BassBoost',
            value: 'bass_but'
          },
          {
            label: '8D',
            value: '8d_but'
          },
          {
            label: 'NightCore',
            value: 'night_but'
          },
          {
            label: 'Pitch',
            value: 'pitch_but'
          },
          {
            label: 'Lofi',
            value: 'lofi_but'
          },
          {
            label: 'Distort',
            value: 'distort_but'
          },
          {
            label: 'Speed',
            value: 'speed_but'
          },
          {
            label: 'Vaporwave',
            value: 'vapo_but'
          }
        ])
    )

  const keplermusicrow = new ActionRowBuilder().addComponents(keplermusic1, keplermusic2, keplermusic3, keplermusic4, keplermusic5);
  const keplermusicrow2 = new ActionRowBuilder().addComponents(keplermusic6, keplermusic7, keplermusic8, keplermusic9, keplermusic10);

  const keplermusic0 = await channel.send({
    embeds: [thing], 
    files: [attachment],
    components: [keplermusicfilter, keplermusicrow],
  });  
  await player.setNowplayingMessage(keplermusic0);
  const embed = new EmbedBuilder().setColor(client.embedColor).setTimestamp();
  const collector = keplermusic0.createMessageComponentCollector({
    filter: (b) => {
      if (b.guild.members.me.voice.channel && b.guild.members.me.voice.channelId === b.member.voice.channelId) return true;
      else {
        b.reply({
          content: `You are not connected to <#${b.guild.members.me.voice?.channelId ?? 'None'}> to use these buttons.`,
          ephemeral: true,
        });
        return false;
      }
    },
    time: track?.duration ?? queue.duration,
  });

  collector.on("collect", async (i) => {
    await i.deferReply({ ephemeral: true });

    if (!player) return collector.stop();

    switch (i.customId) {
      case "pause":
        player.pause(true);
        await keplermusic0.edit({ embeds: [thing], components: [keplermusicfilter, keplermusicrow2], files: [attachment] });
        i.editReply({ embeds: [new EmbedBuilder().setDescription(`**<a:oke:1171088696825622630> Paused Successfully**`).setColor(client.embedColor)], ephemeral: true });
        break;

      case "resume":
        player.pause(false);
        await keplermusic0.edit({ embeds: [thing], components: [keplermusicfilter, keplermusicrow], files: [attachment] });
        i.editReply({ embeds: [new EmbedBuilder().setDescription(`**<a:oke:1171088696825622630> Resume Successfully**`).setColor(client.embedColor)], ephemeral: true });
        break;

      case "stop":
        await player.stop();
        await player.queue.clear();
        await keplermusic0.edit({ embeds: [thing], components: [], files: [attachment] });
        i.editReply({ embeds: [new EmbedBuilder().setDescription(`**<a:oke:1171088696825622630> Successfully Stopped the Music**`).setColor(client.embedColor)], ephemeral: false });
        return collector.stop();

      case "previous":
        await player.seek(0);
        i.editReply({ embeds: [new EmbedBuilder().setDescription(`**<a:oke:1171088696825622630> Successfully Skipped Back To Previous Song**`).setColor(client.embedColor)], ephemeral: true });
        break;

      case "skip":
        await player.stop();
        i.editReply({ embeds: [new EmbedBuilder().setDescription(`**<a:oke:1171088696825622630> Successfully Skipped To Next Song**`).setColor(client.embedColor)], ephemeral: true });
        if (player.queue.length === 1) {
          return collector.stop();
        }
        break;

      case "loop":
        await player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "Enabled" : "Disabled";
        i.editReply({ embeds: [new EmbedBuilder().setDescription(`**<a:oke:1171088696825622630> Music Loop ${trackRepeat}**`).setColor(client.embedColor)], ephemeral: true });
        return;

      default:
        handleFilterInteraction(i);
        break;
    }
  });

  
  async function handleFilterInteraction(i) {
    let responseEmbed;

    switch (i.values[0]) {
      case "clear_but":
        player.clearEffects();
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> Successfully Cleared All **FILTERS**')
          .setColor(client.embedColor);
        break;

      case "bass_but":
        player.setBassboost(true);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> BassBoost mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      case "8d_but":
        player.set8D(true);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> 8D Mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      case "night_but":
        player.setNightcore(true);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> NightCore Mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      case "pitch_but":
        player.setPitch(2);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> Pitch Mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      case "distort_but":
        player.setDistortion(true);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> Distort Mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      case "speed_but":
        player.setSpeed(2);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> Speed Mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      case "vapo_but":
        player.setVaporwave(true);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> VaporWave Mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      case "lofi_but":
        player.setLofi(true);
        responseEmbed = new EmbedBuilder()
          .setDescription('<a:oke:1171088696825622630> Lofi Mode **ENABLED**')
          .setColor(client.embedColor);
        break;

      default:
        break;
    }

    if (responseEmbed) {
      i.editReply({ ephemeral: true, embeds: [responseEmbed] });
    }
  }
}