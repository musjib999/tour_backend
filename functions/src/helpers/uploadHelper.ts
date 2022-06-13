import path from "path";
import os from "os";
import { print } from "../settings";

export function uploadToTempDir(name: string, ext: string, size: number): string {
    const workingDir = path.join(os.tmpdir(), `files`);
    const tmpFilePath = path.join(workingDir, `${name}-thumbnail.${ext}`);
    print(`[uploadToTempDir] >> ${tmpFilePath}`);
    return tmpFilePath;
}