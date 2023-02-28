//(c) R.Panja And Aman
module.exports = {
    name: "vote",
    category: "🔰 Info",
    aliases: ["voting"],
    cooldown: 5,
    usage: "vote",
    description: "Gives You a Currect voting Link.",
    run: async (client, message, args, user, text, prefix) => {
    const {
      config,
      discord: {
        EmbedBuilder
      }
    } = client;
    
    try{
      message.channel.send({
        embeds: [
          new EmbedBuilder()
        .setColor(config.color)
        .setTitle("🙏Vote Me Please !🙏")
        .setFooter({ text: config.footertext, iconURL: config.footericon })
        .setURL(`https://top.gg/bot/${client.user.id}`)
        .setDescription(`[Vote](https://top.gg/bot/${client.user.id})`)
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
