import { fileURLToPath } from 'url';
import path from 'path';
import { createApp } from './create-app/create.js';
// Обработчик для команды create
export const createHandler = async (argv) => {
    const { type, silent } = argv;
    if (!type) {
        console.error('⚠️ Укажите тип (app): cli create <type>');
        process.exit(1);
    }
    // Реализуем логику для разных типов
    switch (type) {
        case 'app':
            silent === false ? console.log('📂 Создание...') : null;
            const currentDir = path.dirname(fileURLToPath(import.meta.url));
            // Путь к src
            const srcPath = path.join(currentDir, '../../samples/nest-app'); // Уходим на 2 уровня вверх
            const destPath = path.join(process.cwd(), 'apps', 'project'); // целевая папка
            await createApp(srcPath, destPath);
            silent === false
                ? console.log(`Сервис создан успешно по пути: ${destPath}`)
                : null;
            break;
        default:
            console.error('⚠️ Неизвестный тип. Доступные типы: app');
            process.exit(1);
    }
};
