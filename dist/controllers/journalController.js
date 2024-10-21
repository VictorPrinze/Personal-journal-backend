"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.getEntries = exports.createEntry = void 0;
const JournalEntry_1 = __importDefault(require("../models/JournalEntry"));
const createEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, category } = req.body;
        const userId = req.userId;
        const entry = new JournalEntry_1.default({ userId, title, content, category });
        yield entry.save();
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating journal entry' });
    }
});
exports.createEntry = createEntry;
const getEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const entries = yield JournalEntry_1.default.find({ userId });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching journal entries' });
    }
});
exports.getEntries = getEntries;
const updateEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;
        const userId = req.userId;
        const entry = yield JournalEntry_1.default.findOneAndUpdate({ _id: id, userId }, { title, content, category }, { new: true });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(entry);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating journal entry' });
    }
});
exports.updateEntry = updateEntry;
const deleteEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const entry = yield JournalEntry_1.default.findOneAndDelete({ _id: id, userId });
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json({ message: 'Entry deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting journal entry' });
    }
});
exports.deleteEntry = deleteEntry;
