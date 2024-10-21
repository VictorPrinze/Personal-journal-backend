//journalEntry.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IJournalEntry extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  category: string;
  date: Date;
}

const JournalEntrySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IJournalEntry>('JournalEntry', JournalEntrySchema);