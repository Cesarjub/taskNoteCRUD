import { Request, Response } from 'express';
import { getAllNotes, getNote, createNewNote, updateNoteById, deleteNoteById } from '../service/notes.service';

//
export const getNotes = async ( req: Request, res: Response ) => {
    try {
        const notes = await getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status( 500 ).json({ message: 'Error al obtener las notas.', error })
    }
}

//
export const createNote = async ( req: Request, res: Response ) => {
    try {
        const { title, content } = req.body;
        const newNote = await createNewNote( title, content );
        
        title && content 
        ? res.status(201).json({ message: "Nota creada con éxito", note: newNote }) 
        : res.status(400).json({ message: "Los campos 'title' y 'content' son obligatorios." });
    } catch (error) {
        res.status( 500 ).json({ message: 'Error creando nota.', error })
    }
}

//
export const getNoteById = async ( req: Request, res: Response ) => {
    try {
        const note = await getNote( req.params.id );
        note 
        ? res.json( note ) 
        : res.status( 404 ).json({ message: 'No se ha encontrado la nota.' });
    } catch (error) {
        res.status( 500 ).json({ message: 'Error obteniendo nota.', error })
    }
}

//
export const updateNote = async ( req: Request, res: Response ) => {
    try {
        const updatedNote = await updateNoteById( req.params.id, req.body );
        updatedNote 
        ? res.json( updatedNote ) 
        : res.status( 404 ).json({ message: 'No se ha encontrado la nota.'});
    } catch (error) {
        res.status( 500 ).json({ message: 'Error al actualizar la nota.', error });
    }
}

//
export const deleteNote = async ( req: Request, res: Response ) => {
    try {
        const deletedNote = await deleteNoteById( req.params.id );
        deletedNote 
        ? res.json({ message: 'Nota eliminada.' }) 
        : res.status( 404 ).json({ message: 'No se ha enontrado la nota a eliminar.' });
    } catch (error) {
        res.status( 500 ).json({ message: 'Error al eliminar la nota.', error });
    }
}