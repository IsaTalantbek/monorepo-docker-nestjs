"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProject = findProject;
const read_config_1 = require("./read-config");
function findProject(appName) {
    const configFile = (0, read_config_1.giveConfig)();
    if (!configFile.projects[appName]) {
        console.error(`Не найдет проект по имени ${appName}`);
        process.exit();
    }
    return configFile.projects[appName];
}
