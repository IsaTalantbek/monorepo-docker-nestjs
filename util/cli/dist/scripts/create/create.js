"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = void 0;
const path_1 = __importDefault(require("path"));
const create_1 = require("./create-app/create");
// Обработчик для команды create
const createHandler = async (argv) => {
    const { type, silent } = argv;
    if (!type) {
        console.error('⚠️ Укажите тип (app): cli create <type>');
        process.exit(1);
    }
    // Реализуем логику для разных типов
    switch (type) {
        case 'app':
            silent === false ? console.log('📂 Создание...') : null;
            const currentDir = __dirname;
            // Путь к src
            const srcPath = path_1.default.join(currentDir, '../../samples/nest-app'); // Уходим на 2 уровня вверх
            const destPath = path_1.default.join(process.cwd(), 'apps', 'project'); // целевая папка
            await (0, create_1.createApp)(srcPath, destPath);
            silent === false ? console.log(`Сервис создан успешно по пути: ${destPath}`) : null;
            break;
        default:
            console.error('⚠️ Неизвестный тип. Доступные типы: app');
            process.exit(1);
    }
};
exports.createHandler = createHandler;
