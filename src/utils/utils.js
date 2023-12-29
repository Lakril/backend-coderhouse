import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const clearConfigCache = () => {
    // eslint-disable-next-line no-undef
    const cache = require.cache;
    const root = resolve(projectRoot, '../');
    const modules = Object.keys(cache).filter((x) => x.startsWith(root));
    modules.forEach((m) => delete cache[m]);
};

// Navigate up to the project root
export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

// console.log(projectRoot)
