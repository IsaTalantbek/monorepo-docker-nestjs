const fs = require('fs');
const path = require('path');

const srcPath = path.join(process.cwd(), 'libs', 'create', 'sample'); // исходная папка
const destPath = path.join(process.cwd(), 'apps', 'project'); // целевая папка

async function copyDir(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true });

    const files = await fs.promises.readdir(src);
    const tasks = files.map(async (file) => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        const stats = await fs.promises.stat(srcPath);

        if (stats.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.promises.copyFile(srcPath, destPath);
        }
    });

    await Promise.all(tasks);
}

copyDir(srcPath, destPath)
    .then(() => console.log(`Микросервис создан по пути ${destPath}`))
    .catch(console.error);
