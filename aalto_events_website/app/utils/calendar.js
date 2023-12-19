import ical from 'ical-generator';

const createCalendarEvent = (event) => {
    const cal = ical({name: 'Aalto Events Calendar' });
    cal.createEvent({
        start: new Date(event.start),
        end: new Date(event.end),
        summary: event.title ? event.title : "",
        description: event.desc ? event.desc : "",
        location: event.location ? event.location : "" ,
        url: "https://aalto-design.vercel.app/"
    });

    return cal.toString();
}

export default createCalendarEvent
