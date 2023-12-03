const fs = require("fs");
const { singularize } = require("i")();
const startCase = require("lodash/startCase");

require("../config/db");

const models = {};

const schemasDir = __dirname + "/allSchemas";
fs.readdirSync(schemasDir).forEach(file => {
    const model = require(schemasDir + `/${file}`);
    const modelName = startCase(singularize(model.modelName));
    models[modelName] = model;
});

module.exports = { ...models };
