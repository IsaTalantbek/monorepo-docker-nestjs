import { execSync } from 'child_process';
import os from 'os';
export function useCommandIn(appPath, command) {
    const shell = os.platform() === 'win32' ? 'cmd.exe' : '/bin/sh';
    execSync(`cd ${appPath} && ${command}`, {
        stdio: 'inherit',
        shell
    });
    return;
}
