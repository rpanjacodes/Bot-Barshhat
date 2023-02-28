//(c) R.Panja And Aman
module.exports = {
  name: "ping",
  category: "🔰 Info",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, message, args, user, text, prefix) => {
    const {
      config,
      discord: {
        EmbedBuilder
      }
    } = client;
    
    try {
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(config.color)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`🏓 Pinging....`)
        ]
      }).then(msg => msg.edit({
        embeds: [
          new EmbedBuilder()
            .setColor(config.color)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``)
        ]
      }))
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
