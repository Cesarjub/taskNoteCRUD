import { server } from './config/server';

server.start();

process.on('SIGINT', async () => {
    console.log('Server shutting down...');
    await server.stop();
    process.exit(0);
});

//export const handler = server.app;