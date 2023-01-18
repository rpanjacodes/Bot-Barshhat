const mySecret = process.env['b_id']
// (c) R.Panja#9236
const host = require('express')();
host.get('/', (req, res) => res.send('Status: 443'));
host.listen(2023);

const Discord = require("discord.js");
//this is the official discord.js wrapper for the Discord Api, which we use!
const onboot = require('./onboot');
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ],
  presence: {
    afk: false,
    status: 'idle',
    activities: [{
      name: `System Runtime`,
      type: Discord.ActivityType.Watching
    }]
  }
});
//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//Loading files, with the client variable like modules
["chatfeature"].forEach(handler => {
    require(`./modules/${handler}`)(client);
});
const Enmap = require("enmap");
client.chatbot = new Enmap({name: "chatbot", ensureProps: false, dataDir: "./databases/chatbot"});
client.stats = new Enmap({name :"stats", ensureProps: false, dataDir: "./databases/stats"})
client.settings = new Enmap({name :"settings", ensureProps: false, dataDir: "./databases/settings"})
//login into the bot
onboot(client, process.env.token);

