"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCRLFtoLF = convertCRLFtoLF;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function convertCRLFtoLF(dir) {
    const files = fs_1.default.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path_1.default.join(dir, file.name);
        if (file.isDirectory()) {
            convertCRLFtoLF(fullPath); // Рекурсивно обрабатываем вложенные директории
        }
        else if (file.isFile()) {
            // Проверяем, что это действительно файл
            let content = fs_1.default.readFileSync(fullPath, 'utf8');
            let newContent = content.replace(/\r\n/g, '\n');
            if (content !== newContent) {
                fs_1.default.writeFileSync(fullPath, newContent, 'utf8');
            }
        }
    }
}
