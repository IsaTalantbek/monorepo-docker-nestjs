import fs from 'fs';
import path from 'path';
export async function createApp(src, dest) {
    await fs.promises.mkdir(dest, { recursive: true });
    const files = await fs.promises.readdir(src);
    const tasks = files.map(async (file) => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        const stats = await fs.promises.stat(srcPath);
        if (stats.isDirectory()) {
            await createApp(srcPath, destPath);
        }
        else {
            await fs.promises.copyFile(srcPath, destPath);
        }
    });
    await Promise.all(tasks);
}
