//(c) R.Panja And Aman
const host = require('express')();
host.get('/', (req, res) => res.send('Status: online'));
host.listen(2023);

const Discord = require("discord.js"),
Enmap = require('enmap');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
  ],
  shards: 'auto',
  makeCache: Discord.Options.cacheWithLimits({
    ApplicationCommandManager: 0,
    AutoModerationRuleManager: 0,
    BaseGuildEmojiManager: 1,
    CategoryChannelChildManager: 0,
    GuildApplicationCommandManager: 0,
    GuildBanManager: 0,
    GuildEmojiManager: 1,
    GuildEmojiRoleManager: 0,
    GuildForumThreadManager: 0,
    GuildInviteManager: 0,
    GuildMemberManager: {
      maxSize: 1,
      keepOverLimit: (member) => member.user.id === client.user.id
    },
    GuildMemberRoleManager: 0,
    GuildScheduledEventManager: 0,
    GuildStickerManager: 0,
    GuildTextThreadManager: 0,
    MessageManager: 0,
    PresenceManager: 0,
    ReactionManager: 0,
    ReactionUserManager: 0,
    StageInstanceManager: 0,
    ThreadManager: 0,
    ThreadMemberManager: 0,
    UserManager: 0,
    VoiceStateManager: 0
  }),
  presence: {
    activities: [{
      name: `Barshhat`,
      type: Discord.ActivityType.Streaming,
      url: `https://twitch.tv/#`
    }]
  }
});

client.discord = Discord;
client.config = require('./util/config');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.categories = client.config.fs.readdirSync("./commands/");

client.stats = new Enmap({name :"stats", ensureProps: false, dataDir: "./databases/stats"});
client.chatbot = new Enmap({name: "chatbot", ensureProps: false, dataDir: "./databases/chatbot"});
client.settings = new Enmap({name :"settings", ensureProps: false, dataDir: "./databases/settings"});

["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

["chatfeature"].forEach(handler => {
    require(`./modules/${handler}`)(client);
});

client.config.onboot(client, client.config.token);