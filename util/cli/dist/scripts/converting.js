import fs from 'fs/promises';
import path from 'path';
import pLimit from 'p-limit';
export async function convertCRLFtoLF(dir) {
    const limit = pLimit(10); // Ограничиваем до 10 параллельных операций
    const stack = [dir]; // Используем стек вместо рекурсии
    while (stack.length > 0) {
        const currentDir = stack.pop();
        const files = await fs.readdir(currentDir, { withFileTypes: true });
        const filePromises = files.map((file) => {
            const fullPath = path.join(currentDir, file.name);
            if (file.isDirectory()) {
                stack.push(fullPath); // Добавляем директорию в стек для дальнейшей обработки
                return undefined;
            }
            else if (file.isFile()) {
                return limit(async () => {
                    try {
                        let content = await fs.readFile(fullPath, 'utf8');
                        let newContent = content.replace(/\r\n/g, '\n');
                        if (content !== newContent) {
                            await fs.writeFile(fullPath, newContent, 'utf8');
                        }
                    }
                    catch (error) {
                        console.error(`Ошибка при обработке файла ${fullPath}:`, error);
                    }
                });
            }
            return undefined;
        });
        // Ожидаем завершения всех операций для текущей директории
        await Promise.allSettled(filePromises);
    }
}
