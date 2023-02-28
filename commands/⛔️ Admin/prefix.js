//(c) R.Panja And Aman
module.exports = {
  name: "prefix",
  aliases: ["prefix"],
  category: "⛔️ Admin",
  description: "Let's you change the Prefix of the BOT",
  usage: "prefix <NEW PREFIX>",
  memberpermissions: ["Administrator"],
  run: async (client, message, args) => {
    const {
      config,
      discord: {
        EmbedBuilder
      }
    } = client;
    
    try {
      let prefix = client.settings.get(message.guild.id, `prefix`);
      if (prefix === null) prefix = config.prefix;
      
      if (!args[0])
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(config.wrongcolor)
              .setFooter({ text: config.footertext, iconURL: config.footericon })
              .setTitle("❌ Error | Please provide a new prefix!")
              .setDescription(`Current prefix: \`${prefix}\``)
          ]
        });
      //if there are multiple arguments
      if (args[1])
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(config.wrongcolor)
              .setFooter({ text: config.footertext, iconURL: config.footericon })
              .setTitle("❌ Error | The prefix can\'t have two spaces")
          ]
        });
      //if the prefix is too long
      if (args[0].length > 5)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(config.wrongcolor)
              .setFooter({ text: config.footertext, iconURL: config.footericon })
              .setTitle("❌ Error | The prefix can\'t be Longer then `5`")
          ]
        });
      //set the new prefix
      client.settings.set(message.guild.id, args[0], `prefix`);
      //return success embed
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(config.color)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`✅ Success | Set new prefix to **\`${args[0]}\`**`)
        ]
      });
    }
    catch (e) {
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
};

