"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventModel_1 = require("../models/EventModel");
const config_1 = require("../utils/config");
const EventRouter = (0, express_1.Router)();
EventRouter.get('/', async (req, res, next) => {
    try {
        const events = await EventModel_1.Event.find({}).sort({ start: 1 }).lean();
        res.status(200).json(events);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
EventRouter.post('/create', async (req, res) => {
    try {
        if (req.body.password !== config_1.APIPASS) {
            return res.status(400).json({ error: "wrong password" });
        }
        const newEvent = new EventModel_1.Event({
            name: req.body.name,
            title: req.body.title,
            desc: req.body.desc,
            location: req.body.location,
            start: req.body.start,
            end: req.body.end,
            image: "",
            tags: req.body.tags,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        });
        const savedEvent = await newEvent.save();
        return res.status(200).json({ res: "success" });
    }
    catch (error) {
        console.error('Error creating event:', error);
        return res.status(400).json({ error: "Error" });
    }
});
EventRouter.patch('/update', async (req, res) => {
    try {
        if (req.body.password !== config_1.APIPASS) {
            return res.status(400).json({ error: "wrong password" });
        }
        const updatedEvent = await EventModel_1.Event.findByIdAndUpdate(req.body._id, {
            $set: {
                name: req.body.name,
                title: req.body.title,
                desc: req.body.desc,
                location: req.body.location,
                start: req.body.start,
                end: req.body.end,
                tags: req.body.tags,
                updated: new Date().toISOString()
            }
        }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        return res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    }
    catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
EventRouter.post('/delete/:id', async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await EventModel_1.Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (req.body.password !== config_1.APIPASS) {
            return res.status(404).json({ message: 'Passowrd not found' });
        }
        await EventModel_1.Event.deleteOne({ _id: eventId });
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = EventRouter;
