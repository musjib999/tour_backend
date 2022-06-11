import path from "path";
import os from "os";

export function uploadToTempDir(name: string, ext: string, size?: number): string {
    const workingDir = path.join(os.tmpdir(), `files`);
    const tmpFilePath = path.join(workingDir, `${name}@${size}x${size}.${ext}`);
    return tmpFilePath;
}