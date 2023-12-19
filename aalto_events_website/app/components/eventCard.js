"use client"
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import LocationIcon from '@mui/icons-material/LocationOn';
import { store } from '../remx/events';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import createCalendarEvent from "../utils/calendar"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function EventCard({ event, liked }) {

  const [heart, setHearth] = useState(liked)
  const router = useRouter()
  const params = useSearchParams()

  const handleShare = async () => {
    await navigator.share({
      text: event.title + "\n" + (event.desc ? event.desc : "") + "\n" + formatDateString(event.start) +
        " - " + formatDateString(event.end) + "\n" + (event.location ? event.location : ""),
    })
  }

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
      hour12: false
    });
  }

  const handleLiked = () => {
    setHearth(!heart)
    store.updateList(event.id, !Boolean(event.isFavorited))
    store.updateFilteredList(event.id, !Boolean(event.isFavorited))
  }

  const handleDelete = async () => {
    if (!Boolean(params.get("edit"))) return
    if (confirm("Are you sure you wan't to delete the event?")) {
      const password = prompt("Please enter password to delete the event");
      await axios.post('https://testi-lye0.onrender.com/api/events/delete/' + event._id, {
        password: password
      });
    }
  }

  const handleEdit = (e) => {
    store.setEditedEvent(event)
    router.push(`/modify?newEvent=false`)
  }

  const handleDownload = () => {
    const icsString = createCalendarEvent(event);
    const blob = new Blob([icsString], { type: 'text/calendar' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className='mt-6' sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              {event.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton aria-label='favorite' onClick={handleLiked}>
              {heart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton aria-label='calendar' onClick={handleDownload}>
              <CalendarMonthIcon />
            </IconButton>
            <IconButton aria-label='share' onClick={handleShare}>
              <ShareIcon />
            </IconButton>
            {Boolean(params.get("edit")) && <IconButton aria-label='edit' onClick={handleEdit}>
              <CreateIcon />
            </IconButton>}
            {Boolean(params.get("edit")) && <IconButton aria-label='edit' onClick={handleDelete}>
              <DeleteForeverIcon />
            </IconButton>}
          </Box>
        </Box>
        <pre className='whitespace-pre-wrap m-0 font-roboto font-normal text-base leading-normal tracking-custom' >
          {event.desc}
        </pre>
        <hr className='text-gray-200 bg-gray-200 h-1 mt-5' />
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 1, marginTop: 1 }}>
          <CalendarIcon />
          <Typography variant="body1">
            {formatDateString(event.start)} - {formatDateString(event.end)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 1, marginTop: 1 }}>

          {event.location &&
            <>
              <LocationIcon />
              <Typography variant="body1">
                {event.location}
              </Typography>
            </>}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 1, marginTop: 1 }}>

          {event.tags &&
            <>
              <ManageSearchIcon />
              <Typography variant="body1">
                {event.tags}
              </Typography>
            </>}
        </Box>
      </CardContent>
    </Card>
  );
}
