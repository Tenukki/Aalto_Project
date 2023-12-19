"use client"
import { Autocomplete, Button, Container, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import { store } from '../../remx/events'

export default function ModifyEvent({ event }) {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()
    const params = useSearchParams()

    const [eventData, setEventData] = useState(event)
    const organizerOptions = ['Arkkitehtikilta', 'Athene', 'Prosessiteekkarikilta', 'Tietokilta', 'Rakennusinsinöörikilta', 'Inkubio']

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Set dates
    const handleDateChange = (date, name) => {
        if (!isNaN(date)) {
            setEventData((prevData) => ({
                ...prevData,
                [name]: date,
            }));
        } else {
            setEventData((prevData) => ({
                ...prevData,
                [name]: null,
            }));
        }
    };

    // Show/hide password
    const handleClickShowPassword = () => {
        setEventData((prevData) => ({
            ...prevData,
            showPassword: !prevData.showPassword,
        }));
    };

    const handleOrganizerChange = (event, newValue) => {
        setEventData((prevData) => ({
            ...prevData,
            organizer: newValue,
        }));
    };

    const handleTagChange = (e) => {
        const { value } = e.target;
        if (!/^[\w,]*(,[\w,]+)*$/.test(value) && value !== '') {
            enqueueSnackbar('Invalid tags format. Words must be separated by commas.', { variant: 'error' });
            return;
        }
        setEventData(prevData => ({ ...prevData, tags: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {
            if (params.get("newEvent") == "true") {  // save a new event
                store.setInitEvent()
                const response = await axios.post("https://testi-lye0.onrender.com/api/events/create", {
                    name: eventData.organizer,
                    title: eventData.title,
                    desc: eventData.description,
                    location: eventData.location,
                    start: eventData.startTime,
                    end: eventData.endTime,
                    tags: eventData.tags,
                    password: eventData.password
                });
                router.push("/")
            } else {  // modify an event
                const response = await axios.patch("https://testi-lye0.onrender.com/api/events/update", {
                    _id: eventData._id,
                    name: eventData.organizer,
                    title: eventData.title,
                    desc: eventData.description,
                    location: eventData.location,
                    start: eventData.startTime,
                    end: eventData.endTime,
                    tags: eventData.tags,
                    password: eventData.password
                });
                store.setInitEvent()
                router.push("/?edit=true")
            }
            enqueueSnackbar('Event saved successfully!', { variant: 'success' });
        } catch (error) {
            console.error('Error: ', error.message);
            enqueueSnackbar('Error wrong password!', { variant: 'error' });
        }
        setTimeout(() => {
            closeSnackbar()
        }, 1000);

    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} style={{ padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">
                    {params.get("newEvent") == "true" ? 'Create Event' : 'Edit Event'}
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 16, marginBottom: 64 }}>

                    {/* Title */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                    />

                    {/* Organizer */}
                    <Autocomplete
                        options={organizerOptions}
                        value={eventData.organizer}
                        onChange={handleOrganizerChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                required
                                margin="normal"
                                fullWidth
                                label="Organizer"
                                name="organizer"
                            />
                        )}
                    />

                    {/* Description */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        label="Description"
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                    />

                    <Grid container spacing={1}>
                        {/* Starting time */}
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Starting time"
                                    value={eventData.startTime}
                                    onChange={(date) => handleDateChange(date, 'startTime')}
                                    slotProps={{ textField: { margin: "normal", required: true, fullWidth: true } }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        {/* Ending time */}
                        <Grid item xs={6}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Ending time"
                                    value={eventData.endTime}
                                    onChange={(date) => handleDateChange(date, 'endTime')}
                                    slotProps={{ textField: { margin: "normal", required: true, fullWidth: true } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    {/* Location */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Location"
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                    />

                    {/* Tags */}
                    <TextField
                        label="Tags"
                        value={eventData.tags}
                        onChange={handleTagChange}
                        margin="normal"
                        multiline
                        fullWidth
                        helperText="Enter tags separated by commas"
                    />

                    {/* Password */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type={eventData.showPassword ? 'text' : 'password'}
                        name="password"
                        value={eventData.password}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={(event) => event.preventDefault()}
                                        edge="end"
                                    >
                                        {eventData.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 16, backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#fff' } }}
                    >
                        Send
                    </Button>
                </form>
            </Paper>
        </Container>
    );

}