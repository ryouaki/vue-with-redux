const path = require('path');

module.exports = {
  configureWebpack: (config) => {
    config.entry = path.resolve( __dirname ,'example/main.js');
    console.log(config.entry)
  },
}
