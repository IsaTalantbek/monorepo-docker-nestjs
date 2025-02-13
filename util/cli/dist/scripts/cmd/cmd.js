"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdHandler = void 0;
const os_1 = __importDefault(require("os"));
const child_process_1 = require("child_process");
const find_project_1 = require("../find-project");
const cmdHandler = (argv) => {
    const { appName, cmd, silent } = argv;
    // Если cmd пустой, выводим ошибку
    if (cmd.length === 0) {
        console.error('Ошибка: необходимо передать команду.');
        process.exit(1);
    }
    const appPath = (0, find_project_1.findProject)(appName);
    const command = cmd.join(' ');
    silent === false
        ? console.log(`Начинаю выполнение ${command} по пути ${appPath}`)
        : null;
    const shell = os_1.default.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
    (0, child_process_1.execSync)(`cd ${appPath} && ${command}`, { stdio: 'inherit', shell });
    silent === false
        ? console.log(`Успешно выполнил ${command} по пути ${appPath}`)
        : null;
};
exports.cmdHandler = cmdHandler;
