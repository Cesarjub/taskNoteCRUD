import { Router } from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/notes.controller';

const router = Router();

router.get( '/', getNotes );

router.post( '/', createNote );

router.get( '/:id', getNoteById );

router.put( ':/id', updateNote );

router.delete( ':/id', deleteNote );

export default router;