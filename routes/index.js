const fs = require('fs');
const path = require('path');
const currentFile = path.basename(__filename);

module.exports = (app) => {
  fs.readdirSync(__dirname)
      .filter((file) => file !== currentFile)
      .forEach((file) => require(__dirname + `/${file}`)(app));
};
