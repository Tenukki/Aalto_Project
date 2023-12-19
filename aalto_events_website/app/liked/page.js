'use client'
import EventCard from "../components/eventCard.js"
import { useConnect } from 'remx';
import { store } from '../remx/events.js';

export default function Liked() {

  const { events } = useConnect(() => ({
    events: store.getEvents(),
  }));


  return (
    <div className="flex-col items-center  bg-sky-100 p-5">
      {events.filter(x => Boolean(x.isFavorited) === true).map(event => (
        <EventCard key={event.id} event={event} liked={Boolean(event.isFavorited)} />
      ))}
      <div value="ÄLÄ KOSKE TÄHÄN DIV:iin" className="mt-14"></div>
    </div>
  )
}
