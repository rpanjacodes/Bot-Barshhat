const Discord = require("discord.js");
const config = require("../../botconfig/config");
const ee = require("../../botconfig/embed");

module.exports = {
  name: "userinfo",
  aliases: ["uinfo"],
  category: "🔰 Info",
  description: "Get information about a user",
  usage: "userinfo [@USER]",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const user = message.mentions.users.first() || message.author;
      if (!user)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(ee.wrongcolor)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })
              .setTitle("❌ Error | Please Mention the User you wanna get Information about")
          ]
        });
      message.channel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("User Info:")
            .addFields(
              {
                name: "Full Username",
                value: `\`${user.tag}\``
              },
              {
                name: "ID",
                value: `\`${user.id}\``
              },
              {
                name: "Playing",
                value: `\`[ ${user.presence.activities} ]\``,
                inline: true
              },
              {
                name: "Status",
                value: `\`${user.presence.status}\``,
                inline: true
              },
              {
                name: "Joined Discord At",
                value: `\`${user.createdAt}\``
              }
            )
            .setColor(ee.color)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon })
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
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
