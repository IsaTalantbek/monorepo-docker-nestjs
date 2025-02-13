import { giveConfig } from './read-config.js';
export function findCompose(composeName) {
    const configFile = giveConfig();
    const composeConfig = configFile['docker-compositions'][composeName];
    const config = JSON.stringify(composeConfig);
    if (!composeConfig) {
        console.error(`Не найдена докер-композиция по имени ${composeName}`);
        process.exit();
    }
    if (!composeConfig.file) {
        console.error(`docker-composition: ${composeName}: ${config} композиция ${composeName} не имеет вложенного свойства строки 'file' которая бы указывала на файл докер композиции`);
        process.exit(1);
    }
    else if (!composeConfig.projects) {
        console.error(`docker-composition: ${composeName}: ${config} композиция ${composeName} не имеет вложенного свойства массив 'projects' которая указывала бы на проекты внутри докер композиции `);
        process.exit(1);
    }
    else if (!Array.isArray(composeConfig.projects)) {
        console.error(`docker-composition: ${composeName}: ${config} вложенное свойство ${composeConfig.projects} не является массивом проектов которая указывала бы на проекты внутри докер композиции`);
        process.exit(1);
    }
    return composeConfig;
}
