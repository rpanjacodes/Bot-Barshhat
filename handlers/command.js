//(c) R.Panja And Aman
module.exports = (client) => {
  const { readdirSync } = client.config.fs;
  try{
    readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
              client.commands.set(pull.name, pull);
              if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
            }
            else continue;
        }
    });
  }catch (e){
    console.log(String(e.stack).bgRed)
  }
};
