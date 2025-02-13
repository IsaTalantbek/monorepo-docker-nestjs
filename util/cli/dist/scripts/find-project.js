import { giveConfig } from './read-config.js';
export function findProject(appName) {
    const configFile = giveConfig();
    if (!configFile.projects[appName]) {
        console.error(`Не найдет проект по имени ${appName}`);
        process.exit();
    }
    return configFile.projects[appName];
}
