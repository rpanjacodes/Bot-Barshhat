//(c) R.Panja And Aman
module.exports = {
    name: "help",
    category: "🔰 Info",
    aliases: ["h", "commandinfo", "cmds", "cmd"],
    cooldown: 4,
    usage: "help [Command]",
    description: "Returns all Commmands, or one specific command",
    run: async (client, message, args, user, text, prefix) => {
      const {
        config,
        discord: {
          EmbedBuilder
        }
      } = client;
      
      try{
        if (args[0]) {
          const embed = new EmbedBuilder();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.channel.send({
                embeds: [embed.setColor(config.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`)]
              });
          }
          if (cmd.name) embed.addFields({ name: "**Command name**", value: `\`${cmd.name}\`` });
          if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
          if (cmd.description) embed.addFields({ name: "**Description**", value: `\`${cmd.description}\`` });
          if (cmd.aliases) embed.addFields({ name: "**Aliases**", value: `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\`` });
          if (cmd.cooldown) embed.addFields({ name: "**Cooldown**", value: `\`${cmd.cooldown} Seconds\`` });
          else embed.addFields({ name: "**Cooldown**", value: `\`1 Second\`` });
          if (cmd.usage) {
              embed.addFields({ name: "**Usage**", value: `\`${config.prefix}${cmd.usage}\`` });
              embed.setFooter({ text: "Syntax: <> = required, [] = optional" });
          }
          if (cmd.useage) {
              embed.addFields({ name: "**Useage**", value: `\`${config.prefix}${cmd.useage}\`` });
              embed.setFooter({ text: "Syntax: <> = required, [] = optional" });
          }
          return message.channel.send(embed.setColor(config.main));
        } else {
          const embed = new EmbedBuilder()
              .setColor(config.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle("HELP MENU 🔰 Commands")
              .setFooter({ text: `To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, iconURL: client.user.displayAvatarURL() });
          const commands = (category) => {
              return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          };
          try {
            for (let i = 0; i < client.categories.length; i += 1) {
              const current = client.categories[i];
              const items = commands(current);
              const n = 3;
              const result = [[], [], []];
              const wordsPerLine = Math.ceil(items.length / 3);
              for (let line = 0; line < n; line++) {
                  for (let i = 0; i < wordsPerLine; i++) {
                      const value = items[i + line * wordsPerLine];
                      if (!value) continue;
                      result[line].push(value);
                  }
              }
              embed.addFields(
                {
                  name: `**${current.toUpperCase()} [${items.length}]**`,
                  value: `> ${result[0].join("\n> ")}`,
                  inline: true
                },
                {
                  name: `\u200b`,
                  value: `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`,
                  inline: true
                },
                {
                  name: `\u200b`,
                  value: `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`,
                  inline: true
                }
              );
            }
          } catch (e) {
              console.log(String(e.stack).red);
          }
          message.channel.send({ embeds: [embed] });
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
            .setColor(config.wrongcolor)
            .setImage(config.help_image)
            .setFooter({ text: config.footertext, iconURL: config.footericon })
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
          ]
        });
    }
  }
}
