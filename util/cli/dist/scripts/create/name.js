import fs from 'fs';
import path from 'path';
/**
 * Рекурсивно заменяет все вхождения "PROJECT_NAME" в файлах директории.
 * @param dir Путь к директории, где нужно заменить "PROJECT_NAME".
 * @param projectName Значение, на которое заменять.
 */
export const replaceProjectName = (dir, projectName) => {
    if (!fs.existsSync(dir)) {
        console.error(`❌ Директория ${dir} не найдена!`);
        return;
    }
    const replacePlaceholders = (content, projectName) => {
        return content.replace(/\/PROJECT_NAME\//g, projectName);
    };
    const processFiles = (dir) => {
        const items = fs.readdirSync(dir);
        items.forEach((item) => {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);
            if (stat.isDirectory()) {
                processFiles(itemPath); // Рекурсивно заходим в папки
            }
            else {
                let content = fs.readFileSync(itemPath, 'utf8');
                const newContent = replacePlaceholders(content, projectName);
                if (content !== newContent) {
                    fs.writeFileSync(itemPath, newContent);
                }
            }
        });
    };
    processFiles(dir);
};
