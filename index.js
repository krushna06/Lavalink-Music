const mongoose = require('mongoose');
const { Database } = require("quickmongo");
const Presto = require("./src/structures/Client");
const client = new Presto();

client.connect()
module.exports = client;
client.db = new Database(client.config.mongourl);
client.db.connect()