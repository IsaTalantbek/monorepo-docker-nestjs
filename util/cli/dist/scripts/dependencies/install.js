"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installHandler = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const installHandler = (argv) => {
    const { appName } = argv;
    if (!appName) {
        console.error('⚠️ Укажите имя приложения: cli install <app-name>');
        process.exit(1);
    }
    // Путь до папки приложения
    const appPath = path_1.default.join(process.cwd(), 'apps', appName);
    try {
        console.log(`🔄 Устанавливаю зависимости для ${appName}...`);
        (0, child_process_1.execSync)(`npm install --prefix ${appPath}`, { stdio: 'inherit' });
        console.log(`✅ Зависимости для ${appName} успешно установлены.`);
    }
    catch (error) {
        console.error(`❌ Ошибка установки зависимостей для ${appName}:`, error.message);
        process.exit(1);
    }
};
exports.installHandler = installHandler;
