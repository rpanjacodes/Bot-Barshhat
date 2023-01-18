const Discord = require("discord.js");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config");
const ee = require("../../botconfig/embed");
const {duration } = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      cpuStat.usagePercent(function (e, percent, seconds) {
          if (e) {
              return console.log(String(e.stack).red);
          }
          const Duration = duration(client.uptime)
          let connectedchannelsamount = 0;
          let guilds = client.guilds.cache.map((guild) => guild);
          for (let i = 0; i < guilds.length; i++) {
              if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
          }
          const botinfo = new Discord.EmbedBuilder()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
              .setTitle("__**Stats:**__")
              .setColor(ee.color)
              .addFields(
                {
                  name: "⏳ Memory Usage",
                  value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``,
                  inline: true
                },
                {
                  name: "⌚️ Uptime ",
                  value: `\`${Duration}\``,
                  inline: true
                },
                {
                  name: "\u200b",
                  value: "\u200b",
                  inline: true
                },
                {
                  name: "📁 Users",
                  value: `\`${client.users.cache.size}\``,
                  inline: true
                },
                {
                  name: "📁 Servers",
                  value: `\`${client.guilds.cache.size}\``,
                  inline: true
                },
                {
                  name: "\u200b",
                  value: "\u200b",
                  inline: true
                },
                {
                  name: "\u200b",
                  value: "\u200b",
                  inline: true
                },
                {
                  name: "👾 Discord.js",
                  value: `\`v${Discord.version}\``,
                  inline: true
                },
                {
                  name: "🤖 Node",
                  value: `\`${process.version}\``,
                  inline: true
                },
                {
                  name: "\u200b",
                  value: "\u200b",
                  inline: true
                },
                {
                  name: "🤖 CPU",
                  value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``
                },
                {
                  name: "🤖 CPU usage",
                  value: `\`${percent.toFixed(2)}%\``,
                  inline: true
                },
                {
                  name: "🤖 Arch",
                  value: `\`${os.arch()}\``,
                  inline: true
                },
                {
                  name: "\u200b",
                  value: "\u200b",
                  inline: true
                },
                {
                  name: "💻 Platform",
                  value: `\`\`${os.platform()}\`\``,
                  inline: true
                },
                {
                  name: "API Latency",
                  value: `\`${client.ws.ping}ms\``,
                  inline: true
                }
              )
              .setFooter({ text: "Barshhat | Made For you." });
          message.channel.send({ embeds: [botinfo] });
      });
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
            .setColor(ee.wrongcolor)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
          ]
        });
    }
  },
};
