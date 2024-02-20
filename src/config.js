require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || ".",  // your bot token
    clientID: process.env.CLIENT_ID || "", // your bot client id
    prefix: process.env.PREFIX || ">", // bot prefix
    ownerID: [""], //your discord id
    SpotifyID: "", // spotify id
    SpotifySecret: "", // spotify secret
    mongourl: "", // MongoDb URL
    embedColor: '#2F3136', // embed colour4
    logs: "", // channel id for guild create and delete logs
    errorLogsChannel: "", //error logs channel id
    ratelimitlog: "", // ratelimit log
    removelog: "", // server remove log
    SearchPlatform: process.env.SEARCH_PLATFORM || "youtube music", // Sets the Search Platform. Possibilities: youtube || youtube music || soundcloud 
    AggregatedSearchOrder: process.env.AGGREGATED_SEARCH_ORDER || "youtube music", // Sets the order of Slash command's AutoComplete results
    links: {
        img: process.env.IMG || '', 
        support: process.env.SUPPORT || '', //support server invite link
        invite: process.env.INVITE || '', //bot invite link
        website: process.env.WEBSITE || '', //bot website link
    }, 
Webhooks: {
      player_create: '', // Webhook url 
      player_delete: '', // Webhook url
      server_add: '', // Webhook url
    },
    nodes: [
         {
            host: process.env.NODE_HOST || "",
            port: parseInt(process.env.NODE_PORT || ""),
            password: process.env.NODE_PASSWORD || "",
            secure: parseBoolean(process.env.NODE_SECURE || "false"),

        }
    ],
}

function parseBoolean(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}