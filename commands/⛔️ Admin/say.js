//(c) R.Panja And Aman
module.exports = {
  name: "say",
  category: "⛔️ Admin",
  aliases: [""],
  cooldown: 2,
  usage: "say <TEXT>",
  description: "Resends your Text",
  run: async (client, message, args, user, text, prefix) => {
    const {
      config,
      discord: {
        EmbedBuilder
      }
    } = client;
    
    try {
      if (!args[0])
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(config.wrongcolor)
              .setFooter({ text: config.footertext, iconURL: config.footericon })
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
            .setColor(config.wrongcolor)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        ]
      });
    }
  }
}
