"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const find_project_1 = require("../find-project");
// Обработчик для удаления
const clearHandler = (argv) => {
    const { appName, silent } = argv;
    if (!appName) {
        console.error('⚠️ Укажите имя приложения: cli delete <app-name>');
        process.exit(1);
    }
    const appPath = (0, find_project_1.findProject)(appName);
    const node_modulesPath = path_1.default.join(process.cwd(), appPath, 'node_modules');
    const package_lockPath = path_1.default.join(process.cwd(), appPath, 'package-lock.json');
    // Проверка существования node_modules
    if (fs_1.default.existsSync(node_modulesPath)) {
        ifNodeModulesExist(node_modulesPath, silent);
    }
    else {
        silent === false
            ? console.log(`⚠️ Директория ${node_modulesPath} не существует. Пропускаем удаление.`)
            : null;
    }
    // Проверка существования package-lock.json
    if (fs_1.default.existsSync(package_lockPath)) {
        ifPackageLockExist(package_lockPath, silent);
    }
    else {
        silent === false
            ? console.log(`⚠️ Файл ${package_lockPath} не существует. Пропускаем удаление.`)
            : null;
    }
};
exports.clearHandler = clearHandler;
function ifNodeModulesExist(node_modulesPath, silent) {
    const filesInNodeModules = fs_1.default.readdirSync(node_modulesPath);
    if (silent === false) {
        // Если node_modules не пуста, удаляем
        if (filesInNodeModules.length > 0) {
            try {
                console.log(`🗑️ Удаляю директорию: ${node_modulesPath}`);
                fs_1.default.rmSync(node_modulesPath, { recursive: true, force: true });
                console.log(`✅ Директория ${node_modulesPath} успешно удалена.`);
            }
            catch (error) {
                console.error(`❌ Ошибка удаления директории ${node_modulesPath}:`, error.message);
                process.exit(1);
            }
        }
        else {
            console.log(`⚠️ Директория ${node_modulesPath} пуста. Пропускаем удаление.`);
        }
    }
    else if (silent === true) {
        if (filesInNodeModules.length > 0) {
            try {
                fs_1.default.rmSync(node_modulesPath, { recursive: true, force: true });
            }
            catch (error) {
                console.error(`❌ Ошибка удаления директории ${node_modulesPath}:`, error.message);
                process.exit(1);
            }
        }
    }
    else {
        console.error('В pro clear <название микросервиса> передан неправилильный флаг для -s');
    }
}
function ifPackageLockExist(package_lockPath, silent) {
    if (silent === false) {
        try {
            console.log(`🗑️ Удаляю файл: ${package_lockPath}`);
            fs_1.default.unlinkSync(package_lockPath); // Удаление файла
            console.log(`✅ Файл ${package_lockPath} успешно удален.`);
        }
        catch (error) {
            console.error(`❌ Ошибка удаления файла ${package_lockPath}:`, error.message);
            process.exit(1);
        }
    }
    else if (silent === true) {
        try {
            fs_1.default.unlinkSync(package_lockPath); // Удаление файла
        }
        catch (error) {
            console.error(`❌ Ошибка удаления файла ${package_lockPath}:`, error.message);
            process.exit(1);
        }
    }
    else {
        console.error('В pro clear <название микросервиса> передан неправилильный флаг для -s');
    }
}
