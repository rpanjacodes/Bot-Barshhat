const { EmbedBuilder } = require("discord.js");
const config = require("../../botconfig/config");
const ee = require("../../botconfig/embed");

module.exports = {
  name: "say",
  category: "⛔️ Admin",
  aliases: [""],
  cooldown: 2,
  usage: "say <TEXT>",
  description: "Resends your Text",
  run: async (client, message, args, user, text, prefix) => {
    try {
      if (!args[0])
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(ee.wrongcolor)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })
              .setTitle(`❌ ERROR | You didn't provided a Text`)
              .setDescription(`Usage: \`${prefix}say <Your Text>\``)
          ]
        });
      message.channel.send(text);
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
