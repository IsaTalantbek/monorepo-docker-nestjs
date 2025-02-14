import fs from 'fs';
import { giveConfig } from '../read-config.js';
export function newProjectConfig(appName, dirname) {
    const config = giveConfig();
    const configPath = giveConfig(true);
    // Добавляем новый проект в объект projects
    config.projects[appName] = dirname;
    // Сохраняем обновленный файл JSON
    fs.writeFile(configPath, JSON.stringify(config, null, 4), (err) => {
        if (err) {
            console.error('Ошибка при сохранении файла:', err);
            return;
        }
    });
}
