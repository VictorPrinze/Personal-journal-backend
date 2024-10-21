// journal.ts
import express from 'express';
import { createEntry, getEntries, updateEntry, deleteEntry } from '../controllers/journalController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.use(authenticate as express.RequestHandler);

router.post('/', createEntry as express.RequestHandler);
router.get('/', getEntries as express.RequestHandler);
router.put('/:id', updateEntry as express.RequestHandler);
router.delete('/:id', deleteEntry as express.RequestHandler);

export default router;