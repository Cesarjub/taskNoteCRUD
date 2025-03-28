import mongoose from 'mongoose';
import env from '../config/callenv';

export const connectDatabase = async () => {

    const MONGO_URI = env.MONGO_URI || '';

    try {
        await mongoose.connect( MONGO_URI );
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error( 'Error al conectar con MongoDB: ', error );
        process.exit(1);
    }
};

export const closeDtabase = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error closing MongoDB connection: ', error);
    }
};