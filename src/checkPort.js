import net from 'net';

function checkPort(port) {
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

export default checkPort;
