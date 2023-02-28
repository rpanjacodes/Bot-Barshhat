//(c) R.Panja And Aman
module.exports = {
  name: "developer",
  category: "🔰 Info",
  aliases: ["dev"],
  description: "Shows Information about the Developer",
  useage: "developer",
  run: async (client, message, args) => {
    const {
      config,
      discord: {
        EmbedBuilder
      }
    } = client;
    
    try {
      const dev = await client.users.fetch(config.dev);
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(config.color)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTimestamp()
            .setThumbnail(dev.displayAvatarURL({ dynamic: true }))
            .setTitle(`${dev.username} | Lead Developer of Barshhat`)
        ]
      }).catch(error => console.log(error));
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(config.wrongcolor)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\`${dev.username} Is my Developer.`)
        ]
      });
    }
  }
}
