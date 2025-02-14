import * as fs from 'fs';
import * as path from 'path';
const configPath = path.resolve(process.cwd(), 'pro-cli.json'); // Читаем из текущей директории
export function giveConfig(givePath) {
    if (givePath) {
        return configPath;
    }
    if (fs.existsSync(configPath)) {
        const rawData = fs.readFileSync(configPath, 'utf-8');
        if (!rawData) {
            return undefined;
        }
        const config = JSON.parse(rawData);
        return config;
    }
    else {
        console.error('Конфигурационный файл не найден');
        process.exit(1);
    }
}
