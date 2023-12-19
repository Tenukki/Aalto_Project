'use client'
import React, { useState, useEffect } from 'react';
import EventCard from "./components/eventCard"
import AddEventButton from "./components/addEventButton"
import axios from 'axios';
import { store } from './remx/events';
import { useConnect } from 'remx';
import TextField from '@mui/material/TextField';
import { useRouter, useSearchParams } from 'next/navigation'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

  const [organizer, setOrganizer] = React.useState('');
  const params = useSearchParams()

  const { events, eventsFiltered } = useConnect(() => ({
    events: store.getEvents(),
    eventsFiltered: store.getFilteredEvents(),
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://testi-lye0.onrender.com/api/events');
        store.setEventsRemx(response.data)
      } catch (error) {
        alert(error)
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setTimeout(() => {
      store.setSearchValue(e.target.value)
    }, 1500);

  }

  const handleSetOrganizer = (e) => {
    setOrganizer(e.target.value);
    store.setCategoryValue(e.target.value)
  };

  const organizerOptions = ['None', 'Arkkitehtikilta', 'Athene', 'Prosessiteekkarikilta', 'Tietokilta', 'Rakennusinsinöörikilta', 'Inkubio']

  return (
    <div className="flex-col items-center  bg-sky-100 p-5">
      <div className='flex  flex-row'>
        <div className='w-full'>
          <TextField id="outlined-basic" label="Type to search" className='w-full' onChange={handleSearchChange} variant="outlined" />
        </div>
        <div className='ml-3'>
          <FormControl variant="filled" sx={{minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Organizer</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={organizer}
              onChange={handleSetOrganizer}
            >
              {organizerOptions.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </div>

      {events.length == 0 && <CircularProgress className='absolute top-1/2 left-1/2' />}

      {eventsFiltered.length == 0 && events.map(event => (
        <EventCard key={event._id} event={event} liked={Boolean(event.isFavorited)} />
      ))}

      {eventsFiltered.length > 0 && eventsFiltered.map(event => (
        <EventCard key={event._id} event={event} liked={Boolean(event.isFavorited)} />
      ))}

      {(params.get("edit")) == "true" && <AddEventButton />}

      <div value="ÄLÄ KOSKE TÄHÄN DIV:iin" className="mt-14"></div>
    </div>
  )
}
