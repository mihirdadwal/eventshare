import React, { useState } from 'react';
import { Typography, Container, Button, Paper, CardMedia, TextField, makeStyles, createStyles, Theme, Snackbar, AlertProps, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EventInterface from '../../models/event'
import * as eventService from '../../services/event-service';

import banner from '../../images/location.jpeg';
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/Footer/Footer'
import MuiAlert from '@mui/material/Alert';
import '../Event/event.css';
import ShareButton from '../../components/share/share';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '../../components/Rating/Rating'
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Payment from '../../components/Payment/Payment';



interface EventDetailProps {
  event_selected: EventInterface;
  onClose: () => void;
  isAdmin: boolean;

}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const EventDetailPage: React.FC<EventDetailProps> = ({ event_selected, onClose, isAdmin }) => {
  console.log("Inside detail page of : " + event_selected.Event_Name)
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<EventInterface>(event_selected);

  const [open, setOpen] = useState(false);  // this for showing deleted message

  // const history = useHistory();

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(event_selected.Location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  // const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(event_selected.Location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {

      // Save data to the backend using the update function
      const updatedEvent = await eventService.updateEvent(editedEvent._id, editedEvent);

      console.log('Updated data:', updatedEvent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChange = (field: keyof EventInterface, value: string) => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [field]: value,
    }));
  };

  const handleDeleteClick = async () => {
    try {
      // Delete data on the backend using the delete function
      await eventService.deleteEvent(editedEvent._id); // Assuming there's an 'id' property in your Event model

      setOpen(true)

      console.log('Deleted data');
      onClose(); // Close the modal or navigate away after deletion

      window.location.href = '/event';

      // handlePopupClick(); // Show the success message
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // button to save events to myEvents
  const saveEVents =() =>{
    // editedEvent.Save="true"
    handleInputChange('Save', "true")
    handleSaveClick();
    }

  const handlePopupClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);         //after succenfully deleted message disappears
  };
  const handlePopupClick = () => {
    setOpen(true);
  };

  if (!event_selected) {
    return <Container><Typography variant="h6">Event not found</Typography></Container>;
  }

  const shareData = {
    title: editedEvent.Event_Name,
    text: editedEvent.Description,
    url: window.location.href,
  };

  return (
    <>
      <Navbar />
      <main className='viewContainer'>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container>

            <Paper className='eventDetails' elevation={1}>
              <img src={banner} alt='Northeastern Event location' />
              <Typography className='eventTitle' variant="h3" gutterBottom>
                {isEditing ? (
                  <TextField
                    value={editedEvent.Event_Name}
                    onChange={(e) => handleInputChange('Event_Name', e.target.value)}
                    label="Event Name" />

                ) : (
                  editedEvent.Event_Name
                )}
              </Typography>
              <Typography variant="body1" paragraph>
                Event Details:{' '}
                {isEditing ? (
                  <TextField
                    value={editedEvent.Description}
                    onChange={(e) => handleInputChange('Description', e.target.value)} />
                ) : (
                  editedEvent.Description
                )}
              </Typography>
              <Typography variant="h6" paragraph>
                Audience:{' '}
                {isEditing ? (
                  <TextField
                    value={editedEvent.Target_Audience}
                    onChange={(e) => handleInputChange('Target_Audience', e.target.value)} />
                ) : (
                  editedEvent.Target_Audience
                )}
              </Typography>
              <div className='eventFlex'>
                <Typography variant="h6" paragraph>
                  Date:{' '}
                  {isEditing ? (
                    <TextField
                      value={editedEvent.Date}
                      onChange={(e) => handleInputChange('Date', e.target.value)} />
                  ) : (
                    editedEvent.Date
                  )}
                </Typography>
                <Typography variant="h6" paragraph>
                  Time :{' '}
                  {isEditing ? (
                    <TextField
                      value={editedEvent.Event_Start_Time}
                      onChange={(e) => handleInputChange('Event_Start_Time', e.target.value)} />
                  ) : (
                    editedEvent.Event_Start_Time
                  )}
                </Typography>
                <Typography variant="h6" paragraph>
                  - {' '}
                  {isEditing ? (
                    <TextField
                      value={editedEvent.Event_End_Time}
                      onChange={(e) => handleInputChange('Event_End_Time', e.target.value)} />
                  ) : (
                    editedEvent.Event_End_Time
                  )}
                </Typography>
              </div>
              <div className='eventFlex'>
                <Typography variant="h6" paragraph>
                  Location:{' '}
                  {isEditing ? (
                    <TextField
                      value={editedEvent.Location}
                      onChange={(e) => handleInputChange('Location', e.target.value)} />
                  ) : (
                    editedEvent.Location
                  )}
                </Typography>
                <Typography variant="h6" paragraph>
                  - {' '}
                  {isEditing ? (
                    <TextField
                      value={editedEvent.Room_Number}
                      onChange={(e) => handleInputChange('Room_Number', e.target.value)} />
                  ) : (
                    editedEvent.Room_Number
                  )}
                </Typography>
              </div>
              <div>
              <Typography variant="h6" paragraph>
                  Category:{' '}
                  {isEditing ? (
                    <FormControl sx={{ mt: 2, minWidth: '100%' }}>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id='category'
                        value={editedEvent.Category}
                        label="Category"
                        onChange={(e) => handleInputChange('Category', e.target.value)}
                      >
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
                  ) : (
                    editedEvent.Category
                  )}
                </Typography>
                <Typography variant="h6" paragraph>
                  Event Link:{' '}
                  {isEditing ? (
                    <TextField
                      value={editedEvent.Event_Link}
                      onChange={(e) => handleInputChange('Event_Link', e.target.value)} />
                  ) : (
                    editedEvent.Event_Link
                  )}
                </Typography>
                <Typography variant="h6" paragraph>
                  Event Organizer:{' '}
                  {isEditing ? (
                    <TextField
                      value={editedEvent.Organizer}
                      onChange={(e) => handleInputChange('Organizer', e.target.value)} />
                  ) : (
                    editedEvent.Organizer
                  )}
                </Typography>
              </div>
              <div className='addEventButton eventButton'>
                {isAdmin && (<>
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSaveClick}
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleEditClick}>
                      <EditIcon />
                    </Button>
                  )}


                  <Button
                    // component={Link} to={`/event`}
                    onClick={handleDeleteClick}
                    variant="contained"
                    color="secondary"
                  >
                    <DeleteIcon />
                  </Button>
                </>)}

                <Button onClick={onClose}>
                  Back
                </Button>

                <ShareButton {...shareData} />

                <Button onClick={saveEVents}>
                  <FavoriteIcon />
                </Button>

                <Snackbar open={open} autoHideDuration={6000} onClose={handlePopupClose}>
                  <Alert onClose={handlePopupClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                  </Alert>
                </Snackbar>
              </div>

                <div className='tickets'>
                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  gutterBottom
                >
                  Seal the Deal: Buy Your Tickets Now!
                </Typography>
                <Payment />
                </div>
              <div className='location'>
                <Typography
                  component="h4"
                  variant="h4"
                  align="center"
                  gutterBottom
                >
                  Explore The Event Location Now!
                </Typography>
                <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  Explore and view all upcoming gatherings across campus with our seamless event location feature. From dynamic lectures to lively social gatherings, discover the perfect venues and unlock the heartbeat of Northeastern's event scene. Your adventure starts here!
                </Typography>
                <iframe
                  width="100%"
                  height="450"
                  loading="lazy"
                  allowFullScreen
                  src={mapUrl}
                  title="Google Map"
                  style={{ border: 0, borderRadius: '8px' }}
                ></iframe>
              </div>
            </Paper>
            <div className='tickets ratings'>
              <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  gutterBottom
                >
                  Your feedback matters — Rate this Event!
                </Typography>
                    <Rating />
              </div>
          </Container>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default EventDetailPage;