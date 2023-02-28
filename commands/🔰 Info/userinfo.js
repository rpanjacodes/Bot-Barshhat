//(c) R.Panja And Aman
module.exports = {
  name: "userinfo",
  aliases: ["uinfo"],
  category: "🔰 Info",
  description: "Get information about a user",
  usage: "userinfo [@USER]",
  run: async (client, message, args, cmduser, text, prefix) => {
    const {
      config,
      discord: {
        EmbedBuilder
      }
    } = client;
    
    try {
      const user = message.mentions.users.first() || message.author;
      if (!user)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(config.wrongcolor)
              .setFooter({ text: config.footertext, iconURL: config.footericon })
              .setTitle("❌ Error | Please Mention the User you wanna get Information about")
          ]
        });
      message.channel.send({
        embeds: [
          new EmbedBuilder()
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
                value: `\`[ ${user.presence?.activities ? user.presence.activities : 'None'} ]\``,
                inline: true
              },
              {
                name: "Status",
                value: `\`${user.presence?.status ? user.presence.status : 'offline'}\``,
                inline: true
              },
              {
                name: "Joined Discord At",
                value: `\`${user.createdAt}\``
              }
            )
            .setColor(config.color)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(config.wrongcolor)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        ]
      });
    }
  }
}
