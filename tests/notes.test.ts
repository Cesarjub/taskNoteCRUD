import request from 'supertest';
import { server } from '../src/config/server';
import mongoose from 'mongoose';
import env from '../src/config/callenv';

describe('API Notes Test', () => {
    let app: any;

    beforeAll( async () => {
        app = server.app;

        if( mongoose.connection.readyState === 0 ) {
            await mongoose.connect( env.MONGO_URI || 'mongodb://localhost:27017/notesdb_test' );
        }
    });

    it('Deberia crear una nueva nota', async () => {
        const res = await request( app )
        .post('/api/note')
        .send({
            title: 'Nota de prueba',
            content: 'Contenido de la nota de prueba'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Nota creada con éxito');
        expect(res.body.note).toHaveProperty('_id');
        expect(res.body.note.title).toBe('Nota de prueba');
    });

    it('Deberia devolver todas las notas', async () => {
        const res = await request( app ).get('/api/note');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    afterAll( async () => {
        await mongoose.connection.close();
    })
})