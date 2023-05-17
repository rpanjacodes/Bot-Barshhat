//(c) R.Panja And Aman
module.exports = {
  fs: require("fs"),
  onboot: require('./onboot'),
  prefix: process.env.prefix,
  token: process.env.token, //put token on Secrets
  b_id: process.env.b_id, //put b_id on Secrets 
  b_key: process.env.b_key, //put b_key on Secrets 
  help_image: process.env.help_image, //put The Link Of image for help image view like A Intro.
  color: "#cba6ff",
  wrongcolor: "#dba96b",
  dev: process.env.dev,
  footertext: process.env.footertext,
  footericon: process.env.footericon
}
