const { exec } = require('child_process');
// Please note that the reboot system using the kill command has been setup for replit users, you may delete those statements if you don't use replit
// full template on https://github.com/fn-aman-20/discord.js-command-handler
module.exports = function onboot(client, token) {
  client.on('error', error => {
    if (!client.readyAt) exec('kill 1');
    else console.log(`[client] :: error\n`, error);
  });
  client.on('shardDisconnect', (event, id) => {
    if (!client.readyAt) exec('kill 1');
    else console.log(`[shard#${id}] :: disconnected`);
  });
  client.on('shardError', (error, id) => {
    if (!client.readyAt) exec('kill 1');
    else console.log(`[shard#${id}] :: error connecting\n`, error);
  });
  client.on('shardReady', (id, na) => {
    console.log(`[shard#${id}] :: connected`);
    if (na) console.log('  unavailable Guild', na);
  });
  client.on('shardResume', (id, no) => {
    if (!client.readyAt) exec('kill 1');
    else console.log(`[shard#${id}] :: reconnected ${no > 1 ? 'after' : 'in'} ${no} attempt${no > 1 ? 's' : ''}`);
  });
  client.on('warn', warning => {
    if (!client.readyAt) exec('kill 1');
    else console.log(`[client] :: warning\n`, warning);
  });
  
  client.login(token).then(setTimeout(() => {
    if (!client.readyAt) exec('kill 1');
  }, 10_000));
  
  process.on('unhandledRejection', (reason, p) => {
    console.log(`\n\n[antiCrash] :: Unhandled Rejection`);
    console.log(reason, p, `\n\n`);
  });
  process.on('uncaughtException', (err, origin) => {
    console.log(`\n\n[antiCrash] :: Uncaught Exception/Catch`);
    console.log(err, origin, `\n\n`);
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(`\n\n[antiCrash] :: Uncaught Exception (MONITOR)`);
    console.log(err, origin, `\n\n`);
  });
}
