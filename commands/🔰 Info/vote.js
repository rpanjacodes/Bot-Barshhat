const { EmbedBuilder } = require("discord.js");
const config = require("../../botconfig/config");
const ee = require("../../botconfig/embed");

module.exports = {
    name: "vote",
    category: "🔰 Info",
    aliases: ["voting"],
    cooldown: 5,
    usage: "vote",
    description: "Gives You a Currect voting Link.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.channel.send({
        embeds: [
          new EmbedBuilder()
        .setColor(ee.color)
        .setTitle("🙏Vote Me Please !🙏")
        .setFooter({ text: ee.footertext, iconURL: ee.footericon })
        .setURL("")
        .setDescription("[Vote Me] hoola ")
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
