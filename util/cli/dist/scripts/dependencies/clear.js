import fs from 'fs';
import path from 'path';
import { findProject } from '../find-project.js';
// Обработчик для удаления
export const clearHandler = (argv) => {
    const { appName, silent } = argv;
    if (!appName) {
        console.error('⚠️ Укажите имя приложения: cli delete <app-name>');
        process.exit(1);
    }
    const appPath = findProject(appName);
    const node_modulesPath = path.join(process.cwd(), appPath, 'node_modules');
    const package_lockPath = path.join(process.cwd(), appPath, 'package-lock.json');
    // Проверка существования node_modules
    if (fs.existsSync(node_modulesPath)) {
        ifNodeModulesExist(node_modulesPath, silent);
    }
    else {
        silent === false
            ? console.log(`⚠️ Директория ${node_modulesPath} не существует. Пропускаем удаление.`)
            : null;
    }
    // Проверка существования package-lock.json
    if (fs.existsSync(package_lockPath)) {
        ifPackageLockExist(package_lockPath, silent);
    }
    else {
        silent === false
            ? console.log(`⚠️ Файл ${package_lockPath} не существует. Пропускаем удаление.`)
            : null;
    }
};
function ifNodeModulesExist(node_modulesPath, silent) {
    const filesInNodeModules = fs.readdirSync(node_modulesPath);
    if (silent === false) {
        // Если node_modules не пуста, удаляем
        if (filesInNodeModules.length > 0) {
            try {
                console.log(`🗑️ Удаляю директорию: ${node_modulesPath}`);
                fs.rmSync(node_modulesPath, { recursive: true, force: true });
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
                fs.rmSync(node_modulesPath, { recursive: true, force: true });
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
            fs.unlinkSync(package_lockPath); // Удаление файла
            console.log(`✅ Файл ${package_lockPath} успешно удален.`);
        }
        catch (error) {
            console.error(`❌ Ошибка удаления файла ${package_lockPath}:`, error.message);
            process.exit(1);
        }
    }
    else if (silent === true) {
        try {
            fs.unlinkSync(package_lockPath); // Удаление файла
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
