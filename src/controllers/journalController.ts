import { Request, Response } from 'express';
import JournalEntry from '../models/JournalEntry';

export const createEntry = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const userId = (req as any).userId;
    const entry = new JournalEntry({ userId, title, content, category });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating journal entry:', error.message);
      res.status(500).json({ message: 'Error creating journal entry', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const getEntries = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const entries = await JournalEntry.find({ userId });
    res.json(entries);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching journal entries:', error.message);
      res.status(500).json({ message: 'Error fetching journal entries', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const updateEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const userId = (req as any).userId;
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: id, userId },
      { title, content, category },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json(entry);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating journal entry:', error.message);
      res.status(500).json({ message: 'Error updating journal entry', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const entry = await JournalEntry.findOneAndDelete({ _id: id, userId });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error deleting journal entry:', error.message);
      res.status(500).json({ message: 'Error deleting journal entry', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
