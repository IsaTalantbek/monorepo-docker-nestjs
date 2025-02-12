"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCompose = findCompose;
const read_config_1 = require("./read-config");
function findCompose(composeName) {
    const configFile = (0, read_config_1.giveConfig)();
    if (!configFile['docker-compositions'][composeName]) {
        console.error(`Не найдена докер-композиция по имени ${composeName}`);
        process.exit();
    }
    return configFile['docker-compositions'][composeName];
}
