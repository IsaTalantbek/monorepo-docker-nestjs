import { execSync } from 'child_process';
import { findCompose } from '../find-composition.js';
import { convertCRLFtoLF } from '../converting.js';
import { findProject } from '../find-project.js';
export const runComposeHandler = async (composeName, silent, formatting) => {
    const compose = findCompose(composeName);
    if (compose === undefined) {
        process.exit(1);
    }
    const composePath = compose['file'];
    if (formatting === true) {
        silent === false
            ? console.log(`Начинаю форматирование проектов внутри композиции ${composePath}, можно отключить написав -f`)
            : null;
        const projects = compose['projects'];
        await Promise.all(projects.map(async (proj) => {
            const projPath = findProject(proj);
            await convertCRLFtoLF(projPath);
        }));
        silent === false
            ? console.log(`Закончил форматирование проектов внутри композиции ${composePath}`)
            : null;
    }
    try {
        silent === false
            ? console.log(`Запуск докер композиции: ${composePath}`)
            : null;
        execSync(`docker compose -f ./${composePath} up --build`, {
            stdio: 'inherit'
        });
        silent === false
            ? console.log(`Успешно запустилась докер композиция: ${composePath}`)
            : null;
    }
    catch (error) {
        console.error(`Ошибка при попытке запустить докер композ: ${error.message}`);
        process.exit(1);
    }
};
