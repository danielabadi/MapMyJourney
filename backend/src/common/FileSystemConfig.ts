import fs from 'fs';

export interface FileSystemConfig {
    getUploadPath(): string;
    removeFile(path: string): void;
}

export class PhotoUploadConfig implements FileSystemConfig {
    private readonly uploadPath: string;

    public constructor(uploadPath: string) {
        this.uploadPath = uploadPath;
    }

    getUploadPath(): string {
        return this.uploadPath;
    }

    removeFile(path: string) {
        fs.unlink(path, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}
