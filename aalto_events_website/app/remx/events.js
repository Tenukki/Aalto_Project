import * as remx from 'remx';
import dayjs from 'dayjs';

const initEvent = { 
    title: '',
    organizer: '',
    description: '',
    startTime: null,
    endTime: null,
    location: '',
    tags: '', 
}

const initialState = {
    events: [],
    eventsFiltered: [],
    editEvent: initEvent
};
const state = remx.state(initialState);

const getters = remx.getters({
    getEvents() {
        return state.events;
    },
    getFilteredEvents() {
        return state.eventsFiltered;
    },
    getEditedEvent() {
        return state.editEvent;
    },
});


const setters = remx.setters({
    setEditedEvent(value) {
        state.editEvent = {
            _id: value._id,
            title: value.title,
            organizer: value.name,
            description: value.desc,
            startTime: dayjs(new Date(value.start)),
            endTime: dayjs(new Date(value.end)),
            location: value.location,
            tags: value.tags ? value.tags : '',
        };
    },
    setInitEvent() {
        state.editEvent = initEvent
    },
    setSearchValue(value) {
        state.eventsFiltered = state.events.filter(x => x.title.toLowerCase().includes(value.toLowerCase()))
    },
    setCategoryValue(value) {
        if (value === "None") state.categoryFiltered = [];
        state.eventsFiltered = state.events.filter(x => x.name.toLowerCase() === (value.toLowerCase()))
    },
    setEventsRemx(value) {
        let ids = localStorage.getItem('likedIds')
        if(ids == null){
            localStorage.setItem('likedIds', '[]')
        }
        let parsedIds = JSON.parse(ids)
        const updatedEvents = value.filter(x => x.title != undefined).map(event => {
            if (parsedIds.includes(event.id)) {
                return { ...event, isFavorited: true };
            }
            return event;
        })
        state.events = updatedEvents
    },
    updateList(id, bool) {
        const updatedEvents = state.events.map(event => {
            if (event.id === id) {
                return { ...event, isFavorited: bool };
            }
            return event;
        })
        let likedIds = updatedEvents.filter(x => x.isFavorited).map(x => x.id)
        localStorage.setItem('likedIds', JSON.stringify(likedIds))
        state.events = updatedEvents
        return updatedEvents
    },
    updateFilteredList(id, bool) {
        const updatedEvents = state.eventsFiltered.map(event => {
            if (event.id === id) {
                return { ...event, isFavorited: bool };
            }
            return event;
        })
        let likedIds = updatedEvents.filter(x => x.isFavorited).map(x => x.id)
        let localList = JSON.parse(localStorage.getItem("likedIds"))
        let pushList = localList.concat(likedIds)
        localStorage.setItem('likedIds', JSON.stringify(pushList))
        state.eventsFiltered = updatedEvents
        return updatedEvents
    },
});

export const store = {
    ...setters,
    ...getters,
};