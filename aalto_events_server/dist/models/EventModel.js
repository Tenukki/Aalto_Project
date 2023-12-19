"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const EventSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.Mixed,
        unique: false,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
        trim: true,
    },
    desc: {
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    },
    start: {
        type: String,
        required: false,
        trim: true
    },
    end: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    tags: {
        type: String,
        required: false,
        trim: true
    },
    created: {
        type: String,
        required: false,
        trim: true
    },
    updated: {
        type: String,
        required: false,
        trim: true
    },
});
EventSchema.plugin(mongoose_unique_validator_1.default);
EventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.Event = (0, mongoose_1.model)('Event', EventSchema);
