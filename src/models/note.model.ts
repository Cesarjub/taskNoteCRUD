import { Schema, model } from 'mongoose';
import { INote } from '../Interfaces/INote';

const NoteSchema = new Schema<INote>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default model<INote>('Note', NoteSchema);