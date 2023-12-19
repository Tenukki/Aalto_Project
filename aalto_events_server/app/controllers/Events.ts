import {
    Router, Request, Response, NextFunction,
} from 'express';
import { Event } from '../models/EventModel';
import { APIPASS } from '../utils/config';

const EventRouter = Router();

EventRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await Event.find({}).sort({ start: 1 }).lean()
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

EventRouter.post('/create', async (req: Request, res: Response) => {
    try {
        if(req.body.password !== APIPASS){
            return res.status(400).json({ error: "wrong password" });
        }

        const newEvent = new Event({
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
        return res.status(200).json({res: "success"});
    } catch (error) {
        console.error('Error creating event:', error);
        return res.status(400).json({ error: "Error" });
    }
});

EventRouter.patch('/update', async (req: Request, res: Response) => {
    try {
        if (req.body.password !== APIPASS) {
            return res.status(400).json({ error: "wrong password" });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.body._id,
            {
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
            },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        return res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

EventRouter.post('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (req.body.password !== APIPASS) {
            return res.status(404).json({ message: 'Passowrd not found' });
        }

        await Event.deleteOne({ _id: eventId });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default EventRouter;
