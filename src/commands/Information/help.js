const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder} = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    aliases: ["h"],
    description: "Help with all commands, or one specific command.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        var icon = client.config.links.icon;
        const ping = message.client.emoji.ping;
        const music = message.client.emoji.music;
        const filter = message.client.emoji.filter;
        const home = message.client.emoji.home;
        const info = message.client.emoji.info;
        const setting = message.client.emoji.setting;
        const desmusic = message.client.emoji.desmusic;
        const desfilters = message.client.emoji.desfilters;
        const desinfo = message.client.emoji.desinfo;
        const dessettings = message.client.emoji.dessettings;
        const descategories = message.client.emoji.descategories;

// Simpan embed asli dalam variabel terpisah
const originalEmbed = new EmbedBuilder()
  .setAuthor({
    name: `${client.user.username} Help Menu`,
    url: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`,
    iconURL: client.user.displayAvatarURL({ dynamic: true })
  })
  .setDescription(`**Hey <@${message.author.id}>!\nListen to your favourite music on discord with your friends!
  The Discord music bot that's 100% free with no payment or votes required to access all its amazing functionalities.**\n\n${ping} \`${client.ws.ping}ms\``)
  .addFields([
    { 
      name: `${descategories}**Categories**`,
      value: `${desmusic} **Music**\n${desfilters} **Filters**\n${desinfo} **Information**\n${dessettings} **Settings**`, 
      inline: false 
    }
  ])
  .setImage("https://cdn.is-a.fun/dei/dei.gif")
  .setColor(client.embedColor);

    let embed = originalEmbed; // Gunakan originalEmbed sebagai template untuk embed
    var support = client.config.links.support;
    var website = client.config.links.website;


    let notherposeidon2 = new ActionRowBuilder().addComponents(
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

        const notherposeidon3 = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("help_pop")
                    .setPlaceholder('Select Here')
                    .addOptions([
                        { label: 'Home', value: 'home1', emoji: `${home}` },
                        { label: 'Music', value: 'music1', emoji: `${music}` },
                        { label: 'Filters', value: 'filters1', emoji: `${filter}` },
                        { label: 'Information', value: 'info1', emoji: `${info}` },
                        { label: 'Settings', value: 'config1', emoji: `${setting}` }
                    ])
            );
            // Add a variable to track the active state of the dropdown menu
        let categoryMenuActive = true;

        let _commands1 = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
        let _commands2 = client.commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``);
        let _commands4 = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
        let _commands6 = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);

        let initialMessage; // Deklarasikan initialMessage di dalam fungsi execute

        initialMessage = await message.reply({ embeds: [embed], components: [notherposeidon2, notherposeidon3] });

        // Buat message component collector
        const interactionCollector = initialMessage.channel.createMessageComponentCollector({
            filter: interaction => interaction.isButton() || interaction.isStringSelectMenu(),
            time: 60000, // Durasi waktu untuk mengumpulkan interaksi dalam milidetik
        });

interactionCollector.on('collect', async (interaction) => {
    if (interaction.isStringSelectMenu()) {
        const selectedValue = interaction.values[0]; // Ambil nilai pertama dari pilihan, karena menu hanya memperbolehkan satu opsi.

        let commandList = []; // Inisialisasi array untuk menyimpan daftar perintah berdasarkan kategori yang dipilih.

        switch (selectedValue) {
                    case 'home1':
                        // Tanggapan jika opsi 'Home' dipilih dari menu dropdown
                        // Kosongkan commandList karena tidak ada kategori 'Home'
                        break;
                    case 'music1':
                        // Tanggapan jika opsi 'Music' dipilih dari menu dropdown
                        commandList = _commands1; // Gunakan perintah dari kategori 'Music'
                        break;
                    case 'filters1':
                        // Tanggapan jika opsi 'Filters' dipilih dari menu dropdown
                        commandList = _commands2; // Gunakan perintah dari kategori 'Filters'
                        break;
                    case 'info1':
                        // Tanggapan jika opsi 'Information' dipilih dari menu dropdown
                        commandList = _commands4; // Gunakan perintah dari kategori 'Information'
                        break;
                    case 'config1':
                        // Tanggapan jika opsi 'Settings' dipilih dari menu dropdown
                        commandList = _commands6; // Gunakan perintah dari kategori 'Config'
                        break;
                    default:
                        break;
                }
        
                // Buat embed baru untuk menampilkan daftar perintah dari kategori yang dipilih
                const categoryEmbed = new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setTitle(`Commands in ${selectedValue.slice(0, -1)}`) // Menggunakan potongan label sebagai judul embed baru
                    .setDescription(commandList.join(', '))
                    .setFooter({
                        text: `Thanks For using this bot.`,
                        iconURL: client.user.displayAvatarURL({ dynamic: true }),
                    });
        
                await interaction.update({ embeds: [categoryEmbed] });
            }
            // Tambahkan penanganan untuk tombol jika diperlukan.
        });
        
        interactionCollector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                try {
                    // Menonaktifkan dropdown menu setelah waktu habis
                    notherposeidon3.components[0].setDisabled(true);
        
                    // Mengedit pesan untuk menghapus komponen yang dinonaktifkan
                    await initialMessage.edit({ embeds: [originalEmbed], components: [notherposeidon2, notherposeidon3] });
                } catch (error) {
                    console.error('Error editing message:', error);
                }
            }
        });
        
        
    }
};   