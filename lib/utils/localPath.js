import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const absolutePath = (relativePath) => {
    return resolve(join(__dirname, '..'), relativePath);
};
