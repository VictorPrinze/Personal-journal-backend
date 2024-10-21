"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journalController_1 = require("../controllers/journalController");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.use(authenticate_1.authenticate);
router.post('/', journalController_1.createEntry);
router.get('/', journalController_1.getEntries);
router.put('/:id', journalController_1.updateEntry);
router.delete('/:id', journalController_1.deleteEntry);
exports.default = router;
