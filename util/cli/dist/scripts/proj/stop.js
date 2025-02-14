import { execSync } from 'child_process';
import { findProject } from '../find-project.js';
export const stopHandler = (appName, silent) => {
    const projectPath = findProject(appName);
    if (projectPath === undefined) {
        process.exit(1);
    }
    const devComposePath = `${projectPath}/docker/docker-compose.dev.yml`;
    const prodComposePath = `${projectPath}/docker/docker-compose.prod.yml`;
    try {
        silent === false
            ? console.log(`Начинаю остановку композиции внутри проекта: ${appName}`)
            : null;
        execSync(`docker compose -f ${devComposePath} -f ${prodComposePath} stop`, {
            stdio: 'inherit'
        });
        silent === false
            ? console.log(`Успешно выполнил остановку композиции внутри проекта: ${appName}`)
            : null;
    }
    catch (error) {
        console.error(`Ошибка при попытке остановки композиции: ${error.message}`);
        process.exit(1);
    }
};
