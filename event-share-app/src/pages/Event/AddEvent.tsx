import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import newEvent from "../../models/newEvent"
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

interface AddEventProps {
    open: boolean;
    onClose: () => void;
    onAddEvent: (newEvent: newEvent) => void;
}



const AddEvent: React.FC<AddEventProps> = ({ open, onClose, onAddEvent }) => {

    const [eventName, setEventName] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [eventLink, setEventLink] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [price, setPrice] = useState('');
    const [save, setSave] = useState('false');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleAddEvent = () => {
        if (!eventName || !targetAudience || !location || !date || !startTime || !endTime
            || !description || !category || !eventLink || !organizer || !price) {
            setErrors({
                eventName: !eventName ? 'Event Name is required' : '',   // Check for a eventName
                targetAudience: !targetAudience ? 'Target Audience is required.' : '',   // Check for targetAudience
                location: !location ? 'Event Location is required.' : '',   // Check for location
                date: !date ? 'Event Date is required.' : '',   // Check for date
                startTime: !startTime ? 'Event Start Time is required.' : '',   // Check for startTime
                endTime: !endTime ? 'Event End Time is required.' : '',   // Check for endTime
                description: !description ? 'Event Description is required.' : '',   // Check for description
                category: !category ? 'Event category is required.' : '',   // Check for category
                eventLink: !eventLink ? 'Event Link is required.' : '',   // Check for eventLink
                organizer: !organizer ? 'Event organizer is required.' : '',   // Check for organizer
                price: !price ? 'Event price is required.' : '',   // Check for price
            });
            return;
        }
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!dateRegex.test(date)) {
            setErrors({
                date: 'Enter valid date (MM/DD/YYYY)',   // Check for date
            });
            return;
        }

        // Create a new event object
        const newEvent: newEvent = {
            Event_Name: eventName,
            Target_Audience: targetAudience,
            Location: location,
            Date: date,
            Event_Start_Time: startTime,
            Event_End_Time: endTime,
            Room_Number: roomNumber,
            Description: description,
            Category: category,
            Event_Link: eventLink,
            Organizer: organizer,
            Price: price,
            Save:save
        };

        onAddEvent(newEvent);

        // Reset the form
        setEventName('');
        setTargetAudience('');
        setLocation('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setCategory('');
        setEventLink('');
        setOrganizer('');
        setPrice('');


        // Close the form
        onClose();

        window.location.reload();

    }
    return (
        <React.Fragment>
            <Dialog className='add-event' open={open} onClose={onClose} disableEscapeKeyDown >
                <DialogTitle className='dialogName'>Add New Event</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the details for the new event.
                    </DialogContentText>
                    <TextField
                        label="Event Name*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={eventName}
                        // onChange={(e) => setEventName(e.target.value)}
                        onChange={(e) => {
                            setEventName(e.target.value);
                            setErrors({ ...errors, eventName: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.eventName}</span>

                    <TextField
                        label="Target Audience*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={targetAudience}
                        onChange={(e) => {
                            setTargetAudience(e.target.value)
                            setErrors({ ...errors, targetAudience: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.targetAudience}</span>

                    <TextField
                        label="Room Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={roomNumber}
                        onChange={(e) => {
                            setRoomNumber(e.target.value)
                            // setErrors({ ...errors, roomNumber: '' });
                        }}
                    />
                    {/* <span className='error' style={{ color: '#b61601' }}>{errors.username}</span> */}

                    <TextField
                        label="Location*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value)
                            setErrors({ ...errors, location: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.location}</span>

                    <TextField
                        label="Date (MM/DD/YYYY)* "
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value)
                            setErrors({ ...errors, date: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.date}</span>

                    <TextField
                        label="Start Time*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={startTime}
                        onChange={(e) => {
                            setStartTime(e.target.value)
                            setErrors({ ...errors, startTime: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.startTime}</span>

                    <TextField
                        label="End Time*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={endTime}
                        onChange={(e) => {
                            setEndTime(e.target.value)
                            setErrors({ ...errors, endTime: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.endTime}</span>

                    <TextField
                        label="Description*"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={5}
                        margin="normal"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            setErrors({ ...errors, description: '' });
                        }}
                    />

                    <FormControl sx={{ mt: 2, minWidth: '100%' }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id='category'
                            value={category}
                            label="Category"
                            onChange={(e) => {
                                setCategory(e.target.value)
                                // setErrors({ ...errors, description: '' });
                            }}                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Online">Online</MenuItem>
                            <MenuItem value='Entertainment'>Entertainment</MenuItem>
                            <MenuItem value="Food and Drinks">Food and Drinks</MenuItem>
                            <MenuItem value="Business & Professional events">Business & Professional events</MenuItem>
                            <MenuItem value="Health & Wellness events">Health & Wellness events</MenuItem>
                            <MenuItem value="Free events">Free events</MenuItem>
                            <MenuItem value="Public">Public</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>


                        </Select>
                    </FormControl>
                    <span className='error' style={{ color: '#b61601' }}>{errors.category}</span>

                    <TextField
                        label="Event Link*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={eventLink}
                        onChange={(e) => {
                            setEventLink(e.target.value)
                            setErrors({ ...errors, eventLink: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.eventLink}</span>

                    <TextField
                        label="Event Organizer*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={organizer}
                        onChange={(e) => {
                            setOrganizer(e.target.value)
                            setErrors({ ...errors, organizer: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.organizer}</span>

                    <TextField
                        label="Price*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                            setErrors({ ...errors, price: '' });
                        }}
                    />
                    <span className='error' style={{ color: '#b61601' }}>{errors.price}</span>

                </DialogContent>
                <DialogActions className='addEventButton'>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAddEvent}>Add Event</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddEvent;