//(c) R.Panja And Aman
module.exports = {
  name: "serverinfo",
  aliases: ["sinfo"],
  category: "🔰 Info",
  description: "Shows info about a server",
  usage: "serverinfo",
  run: async (client, message, args, cmduser, text, prefix) => {
    const {
      config,
      discord: {
        EmbedBuilder
      }
    } = client;
    const owner = await client.users.fetch(message.guild.ownerId);
    try {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Server Information")
            .setColor(config.color)
            .addFields(
              {
                name: "Server Name",
                value: "\`" + message.guild.name + "\`"
              },
              {
                name: "Owner",
                value: "\`" + `${owner.tag}\`"`,
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
            .setColor(config.wrongcolor)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        ]
      });
    }
  }
}
