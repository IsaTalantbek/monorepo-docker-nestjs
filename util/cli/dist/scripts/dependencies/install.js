"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installHandler = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const find_project_1 = require("../find-project");
const installHandler = (argv) => {
    const { appName, silent } = argv;
    if (!appName) {
        console.error('⚠️ Укажите имя приложения: cli install <app-name>');
        process.exit(1);
    }
    const appPath = (0, find_project_1.findProject)(appName);
    // Путь до папки приложения
    const fullAppPath = path_1.default.join(process.cwd(), appPath);
    try {
        if (silent === true) {
            (0, child_process_1.execSync)(`npm install --prefix ${fullAppPath}`, {
                stdio: 'inherit'
            });
        }
        else {
            console.log(`🔄 Устанавливаю зависимости для ${appName}...`);
            (0, child_process_1.execSync)(`npm install --prefix ${fullAppPath}`, {
                stdio: 'inherit'
            });
            console.log(`✅ Зависимости для ${appName} успешно установлены.`);
        }
    }
    catch (error) {
        console.error(`❌ Ошибка установки зависимостей для ${appName}:`, error.message);
        process.exit(1);
    }
};
exports.installHandler = installHandler;
