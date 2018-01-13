import * as path from 'path';
import * as fs from 'fs';

const dir: string = __dirname;
const baseDir: string = path.join(dir, '../../');

export class IOUtils {
	public static readonly baseDir: string = baseDir;

	public static pathHelper(filePath: string): string {
		return path.join(this.baseDir, filePath);
	}
}
