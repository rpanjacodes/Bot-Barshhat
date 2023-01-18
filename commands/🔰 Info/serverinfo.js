const Discord = require("discord.js");
const config = require("../../botconfig/config")
const ee = require("../../botconfig/embed");

module.exports = {
  name: "serverinfo",
  aliases: ["sinfo"],
  category: "🔰 Info",
  description: "Shows info about a server",
  usage: "serverinfo",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      message.channel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("Server Information")
            .setColor(ee.color)
            .addFields(
              {
                name: "Server Name",
                value: "\`" + message.guild.name + "\`"
              },
              {
                name: "Owner",
                value: "\`" + `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\`"`,
                inline: true
              },
              {
                name: "Channels",
                value: "\`" + message.guild.channels.cache.size + "\`",
                inline: true
              },
              {
                name: "Roles",
                value: "\`" + message.guild.roles.cache.size + "\`",
                inline: true
              },
              {
                name: "Created On",
                value: "\`" + message.guild.createdAt + "\`"
              },
              {
                name: "You Joined",
                value: "\`" + message.member.joinedAt + "\`"
              },
              {
                name: "Total Members",
                value: "\`" + message.guild.memberCount + "\`"
              }
            )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
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
