//(c) R.Panja And Aman
module.exports = async (client) => {
  const { fs } = client.config;
  try{
    const load_dir = (dir) => {
      const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
      for (const file of event_files){
        const event = require(`../events/${dir}/${file}`)
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
      }
    }
    ["client", "guild"].forEach(e=>load_dir(e));
  }catch (e){
    console.log(String(e.stack).bgRed)
  }
};
