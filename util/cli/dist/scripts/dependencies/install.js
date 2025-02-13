"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installHandler = void 0;
const child_process_1 = require("child_process");
const find_project_1 = require("../find-project");
const os_1 = __importDefault(require("os"));
const installHandler = (argv) => {
    const { appName, silent } = argv;
    if (!appName) {
        console.error('⚠️ Укажите имя приложения: cli install <app-name>');
        process.exit(1);
    }
    const appPath = (0, find_project_1.findProject)(appName);
    try {
        if (silent === true) {
            const shell = os_1.default.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
            (0, child_process_1.execSync)(`cd ${appPath} && npm install`, {
                stdio: 'inherit',
                shell
            });
        }
        else {
            console.log(`🔄 Устанавливаю зависимости для ${appPath}...`);
            const shell = os_1.default.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
            (0, child_process_1.execSync)(`cd ${appPath} && npm install`, {
                stdio: 'inherit',
                shell
            });
            console.log(`✅ Зависимости для ${appPath} успешно установлены.`);
        }
    }
    catch (error) {
        console.error(`❌ Ошибка установки зависимостей для ${appPath}:`, error.message);
        process.exit(1);
    }
};
exports.installHandler = installHandler;
