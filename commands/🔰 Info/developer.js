const { EmbedBuilder } = require("discord.js")
const config = require("../../botconfig/config")
const ee = require("../../botconfig/embed")
module.exports = {
  name: "developer",
  category: "🔰 Info",
  aliases: ["dev",],
  description: "Shows Information about the Developer",
  useage: "developer",
  run: async (client, message, args) => {
    try {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTimestamp()
            .setThumbnail("https://images-ext-2.discordapp.net/external/_GrxoxMG6RlyDuRI_B5NoT1expbvclwUBkBm7Ut7um4/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/909798528694489098/db9d20678018a94b9affea14c1e85ffd.png")
            .setTitle("R.Panja | Lead Developer of Barshhat ")
        ]
      }).catch(error => console.log(error));
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(ee.wrongcolor)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\`R.Panja Is my Developer.`)
        ]
      });
    }
  }
}
