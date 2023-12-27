 
import { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import Event from '../../models/event'
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import myImage from '../../images/Northeastern-University-Logo.png';
import { Link } from 'react-router-dom';
import * as eventService from '../../services/event-service';
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/Footer/Footer'
import newEvent from "../../models/newEvent"
import '../Event/event.css';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { findById, searchEvents } from '../../store/slices/event-slice';
import { selectIDs } from '../../store/slices/savedEvent-slice';
 
 
 
const initialState: Event[] = [];
const initialSelectedEventState: Event = {} as Event;
 
 
const defaultTheme = createTheme();
 
const MyEvents: React.FC = () => {
  const { t } = useTranslation('common');
 
  const idArray = useSelector(selectIDs(''));
  console.log("idarray" + idArray)
 
  const [searchTerm, setSearchTerm] = useState('');
 
  const [eventList, setEvents] = useState<Event[]>(initialState);
 
  const events = useSelector(searchEvents(''));  //all events
 
  const filteredEvents = useSelector(searchEvents(searchTerm));
  const remainingEvents = events.filter(
    (event) => !filteredEvents.includes(event)
  );
 
 
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };
  const [selectedEvent, setSelectedEvent] = useState<Event>(initialSelectedEventState);
 
  //................................
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Handler for opening the form
  const openForm = () => {
    setIsFormOpen(true);
  };
 
  // Handler for closing the form
  const closeForm = () => {
    setIsFormOpen(false);
  };
 
  const addEvent = async (newEvent: newEvent) => {
    // Call the API function to add the event (replace with your actual function)
    // addEvent(newEvent);
    try {
      const createdEvent = await eventService.addEvent(newEvent);
      console.log('Adding event:', newEvent);
      console.log('from database event:' + createdEvent.Event_Name);
    } catch (error) {
      console.log(error)
    }
  };
 
  // const filteredEvents = events.filter((event) =>
  //   event.Event_Name.toLowerCase().startsWith(searchTerm.toLowerCase())
  // );
 
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const isAdmin = sessionStorage.getItem('isAdmin');
 
  // If the user is not logged in, redirect to the sign-in page
  if (!isLoggedIn) {
    window.location.href = '/signin';
    return null; // This line is not strictly necessary, but it's good practice to exit early
  }
 
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar />
      <main>
        {/*View All saved events */}
 
        <div className='pageBreak viewEvents'>
          <Container>
          <Typography
            component="h3"
            variant="h3"
            align="center"
            color="#000"
            gutterBottom
          >
            View All Saved Events
          </Typography>
          <Typography
            component="h5"
            variant="h5"
            align="center"
            color="#000"
            gutterBottom
          >
            Discover the events you've saved for later, all in one place! Whether it's important dates, exciting activities, or must-attend gatherings, your saved events are organized and ready for you.
          </Typography>
            <Grid className="searchResult allEvent" container spacing={4}>
              {events.filter((event) => event.Save.startsWith("true")).slice().reverse().map((event: Event) => (
                <Grid item key={event._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={myImage}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {event.Event_Name}
                      </Typography>
                      <Typography>
                        {event.Room_Number} - {event.Location}
                      </Typography>
                      <Typography>
                        {event.Date}
                      </Typography>
                      <Typography>
                        {event.Event_Start_Time} - {event.Event_End_Time}
                      </Typography>
                    </CardContent>
                    <CardActions className='viewButton'>
                      <Button component={Link} to={`/event/${event._id}`} onClick={() => handleEventClick(event)}>View Event Details</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
 
        {/*Add event section for Admin */}
        {/* {isAdmin && (
          <>
            <div className='pageBreak addEvent'>
              <Container className='leftPanelEvent'>
                <div>
                  <img src={Banner} alt='Northeastern New Event' />
                </div>
              </Container>
              <Container className='rightPanelEvent'>
                <div className='event-wrapper'>
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    {t('title3')}
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    {t('info4')}
                  </Typography>
                  < Button variant="contained" color="primary" onClick={openForm}>
                    {t('info5')}
                  </Button>
                  <AddEvent open={isFormOpen} onClose={closeForm} onAddEvent={addEvent} />
                </div>
              </Container>
            </div>
          </>
        )} */}
        {/* <AddEvent open={isFormOpen} onClose={closeForm} onAddEvent={addEvent} /> */}
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
 
 
};
export default MyEvents;