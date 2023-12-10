import net from 'net';

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
}

export const __dirname = new URL(import.meta.url).pathname;

console.log(__dirname)