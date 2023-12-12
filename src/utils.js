import net from 'net';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const checkPort = (port) => {
    return new Promise((resolve, reject) => {
        const server = net
            .createServer()
            .once('error', (err) => {
                // @ts-ignore
                if (err.code === 'EADDRINUSE') {
                    resolve(true);
                } else {
                    reject(err);
                }
            })
            .once('listening', () => {
                server
                    .once('close', () => {
                        resolve(false);
                    })
                    .close();
            })
            .listen(port);
    });
};

// Path: backend-coderhouse/backend-coderhouse/src
export const __dirname = dirname(fileURLToPath(import.meta.url));
