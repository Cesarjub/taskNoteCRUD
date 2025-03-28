import Note from '../models/note.model';
import { INote } from '../Interfaces/INote';

//
export const getAllNotes = async (): Promise<INote[]> => {
    return await Note.find();
}

//
export const getNote = async ( id: string ): Promise<INote | null> => {
    return await Note.findById( id );
}

//
export const createNewNote = async ( title: string, content: string ): Promise<INote> => {
    const newNote = new Note({ title, content });
    return await newNote.save();
}

//
export const updateNoteById = async( id: string, data: Partial<INote> ): Promise<INote | null> => {
    return await Note.findByIdAndUpdate( id, data, { new: true } );
}

//
export const deleteNoteById = async ( id: string ): Promise<INote | null> => {
    return await Note.findByIdAndDelete( id );
}