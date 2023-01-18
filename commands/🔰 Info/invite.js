const config = require("../../botconfig/config");
const ee = require("../../botconfig/embed");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  cooldown: 5,
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(ee.color)
            .setTitle(":heart: Thanks for inviting me!")
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setURL("https://bit.ly/3u26wKW")
            .setDescription("[Click here](https://bit.ly/3u26wKW)")
        ]
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
  }
}
