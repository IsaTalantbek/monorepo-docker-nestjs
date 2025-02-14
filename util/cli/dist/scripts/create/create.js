import { fileURLToPath } from 'url';
import { createApp } from './create-app/create.js';
import { giveConfig } from '../read-config.js';
import { replaceProjectName } from './name.js';
import pathF from 'path';
import { newProjectConfig } from './config.js';
// Обработчик для команды create
export const createHandler = async (argv) => {
    const { type, silent, appName, path } = argv;
    if (!type) {
        console.error('⚠️ Укажите тип (app): cli create <type>');
        process.exit(1);
    }
    const config = giveConfig();
    const name = appName.toLowerCase();
    if (config.projects[name]) {
        console.error('Такое имя для проекта уже существует');
        process.exit(1);
    }
    // Реализуем логику для разных типов
    switch (type) {
        case 'app':
            silent === false ? console.log('📂 Создание...') : null;
            const config = giveConfig();
            const currentDir = pathF.dirname(fileURLToPath(import.meta.url));
            // Путь к src
            const srcPath = pathF.join(currentDir, '../../samples/nest-app'); // Уходим на 2 уровня вверх
            const dirPath = `${path || config['create-projects-dir'] || 'apps'}/${name}`;
            const destPath = pathF.join(process.cwd(), dirPath); // целевая папка
            await createApp(srcPath, destPath);
            replaceProjectName(destPath, name);
            newProjectConfig(name, dirPath);
            silent === false
                ? console.log(`Сервис создан успешно по пути: ${destPath}`)
                : null;
            break;
        default:
            console.error('⚠️ Неизвестный тип. Доступные типы: app');
            process.exit(1);
    }
};
