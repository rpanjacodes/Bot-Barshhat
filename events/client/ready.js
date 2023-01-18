const config = require("../../botconfig/config")
module.exports = client => {
  try{
    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }catch{ /* */ }
  let satutsswitch = true;
  try{
    client.user.setPresence({
      activity: {
        name: `I Am Created 20 Nov 2022`,
        type: 1
      },
      status: 'idle'
//status : 'dnd' 'idle' 'online'
    });
  }catch (e) {
      console.log(String(e.stack).red);
  }
  //Change status 10 minutes
  setInterval(()=>{
    try{
      if(satutsswitch){
        satutsswitch = !satutsswitch;
        let channelsize = 0;
        for(const gid of client.guilds.cache.map(g => g.id)) {
          try { channelsize += client.chatbot.get(gid, "channels").length }
          catch { continue }
        }
        client.user.setPresence({
          status: 'idle',
          activities: [{
            name: `Barshhat With ${client.guilds.cache.size} Servers.`,
            type: 1,
            url: 'https://twitch.tv/#'
          }]
        });
//status : 'dnd' 'idle' 'online'
      }
      else{
        satutsswitch = !satutsswitch;
        client.user.setPresence({
          status: 'idle',
          activities: [{
            name: `Barshhat With ${client.users.cache.size} Users.`,
            type: 1,
            url: 'https://twitch.tv/#'
          }]
        });
//status : 'dnd' 'idle' 'online'
      }
    }catch (e) {
        console.log(String(e.stack).red);
    }
  }, 12*1000)
}
