import env from './callenv';
import express from 'express';
import cors from 'cors';
import routeNote from '../routes/notes.routes';
import { connectDatabase, closeDtabase } from '../database/database';
import helmet from 'helmet';

class Server {

    public app: express.Application;
    private port: string | number;
    readonly routePath = '/api/note';

    constructor() {
        this.app = express();
        this.port = env.PORT || 3000;
        this.configuration();
        this.middlewares();
        this.routes();
    }

    private configuration() {
        this.app.set( 'port', this.port );
    }

    private middlewares() {
        this.app.use( helmet() );
        this.app.use( helmet.hidePoweredBy() );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use( cors() );
    }

    private routes() {
        this.app.use( this.routePath, routeNote );
    }

    private listen() {
        this.app.listen( this.port, () => console.log( `Server listening on ${ this.port }` ) );
    }

    public async start() {
        await connectDatabase();
        this.listen();
    }

    public async stop() {
        await closeDtabase();
    }

}

export const server = new Server();