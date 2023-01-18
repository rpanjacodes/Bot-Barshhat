const { EmbedBuilder } = require("discord.js");
const config = require("../../botconfig/config");
const ee = require("../../botconfig/embed");

module.exports = {
  name: "ping",
  category: "🔰 Info",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(`🏓 Pinging....`)
        ]
      }).then(msg => msg.edit({
        embeds: [
          new EmbedBuilder()
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``)
        ]
      }))
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
  }
}
