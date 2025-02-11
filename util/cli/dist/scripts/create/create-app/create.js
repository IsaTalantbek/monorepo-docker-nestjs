"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function createApp(src, dest) {
    await fs_1.default.promises.mkdir(dest, { recursive: true });
    const files = await fs_1.default.promises.readdir(src);
    const tasks = files.map(async (file) => {
        const srcPath = path_1.default.join(src, file);
        const destPath = path_1.default.join(dest, file);
        const stats = await fs_1.default.promises.stat(srcPath);
        if (stats.isDirectory()) {
            await createApp(srcPath, destPath);
        }
        else {
            await fs_1.default.promises.copyFile(srcPath, destPath);
        }
    });
    await Promise.all(tasks);
}
