// Importing necessary dependencies and components from Material-UI, React, and other files
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
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
import image2 from '../../images/flag1.jpg';
import image3 from '../../images/flag2.jpg';
import image4 from '../../images/flag4.jpg';
import image5 from '../../images/Northeasetern_JPG.jpg';
import image6 from '../../images/Northeastern-University-Logo.png';
import { Link } from 'react-router-dom';
import * as eventService from '../../services/event-service';
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/Footer/Footer'
import AddEvent from './AddEvent'
import newEvent from "../../models/newEvent"
import '../Event/event.css';
import Banner from '../../images/students-Husky-Dog-2048x1363.jpg';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { searchEvents } from '../../store/slices/event-slice';

// Array of images for events
const imageArray = [myImage, image2, image3, image4, image5, image6];
const initialState: Event[] = [];
const initialSelectedEventState: Event = {} as Event;

// Default Material-UI theme
const defaultTheme = createTheme();

// Functional component for the Event List Page
const EventListPage: React.FC = () => {
  // Hooks for managing state and fetching events
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventList, setEvents] = useState<Event[]>(initialState);
  const events = useSelector(searchEvents(''));  // All events
  const filteredEvents = useSelector(searchEvents(searchTerm));
  const remainingEvents = events.filter((event) => !filteredEvents.includes(event));
  const [selectedEvent, setSelectedEvent] = useState<Event>(initialSelectedEventState);

  // Hooks for managing the AddEvent form
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Function to get a random image from the imageArray
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  };

  // Event click handler
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  // Handlers for opening and closing the AddEvent form
  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Function to add a new event
  const addEvent = async (newEvent: newEvent) => {
    try {
      const createdEvent = await eventService.addEvent(newEvent);
      console.log('Adding event:', newEvent);
      console.log('From database event:' + createdEvent.Event_Name);
    } catch (error) {
      console.log(error)
    }
  };

  // Checking user authentication and redirecting if not logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true'
  console.log("isAdmin: " + isAdmin)

  if (!isLoggedIn) {
    // Redirect to sign-in page if not logged in
    window.location.href = '/signin';
    return null;
  }

  // JSX rendering for the Event List Page
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar />
      <main>
        {/* Banner section */}
        <div className='banner'>
        </div>

        {/* Information section */}
        <div className='fadeInUp-animation'>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="#fff"
            gutterBottom
          >
            {t('title1')}
          </Typography>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="#fff"
            gutterBottom
          >
            {t('info1')}
          </Typography>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="#fff"
            gutterBottom
          >
            {t('info2')}
          </Typography>
        </div>

        {/* Search Event section */}
        <div className='pageBreak searchEvent'>
          <Container>
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {t('title2')}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {t('info3')}
            </Typography>

            {/* Search input field */}
            <TextField
              label="Search on Event Share"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Display search results if there is a search term */}
            {searchTerm && (
              <>
                <div className='searchResults'>
                  {filteredEvents.length === 0 ? (
                    "Oops! No events found - How about trying a different search?"
                  ) : (
                    "Search Results:"
                  )}
                </div>

                {/* Displaying search result cards */}
                <Grid className="searchResult" container spacing={4}>
                  {filteredEvents.slice().reverse().map((event: Event) => (
                    <Grid item key={event._id} xs={12} sm={6} md={4}>
                      <Card className='cards'
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      >
                        <CardMedia className='cardImage'
                          component="div"
                          sx={{
                            pt: '56.25%', // 16:9
                          }}
                          image={getRandomImage()}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h5" color="#000">
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
              </>
            )}
          </Container>
        </div>

        {/* Add Event section for Admin */}
        <Container>
          {isAdmin && (
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
                      component="h3"
                      variant="h3"
                      align="center"
                      color="text.primary"
                      gutterBottom
                    >
                      {t('title3')}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                      {t('info4')}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={openForm}>
                      {t('info5')}
                    </Button>
                    <AddEvent open={isFormOpen} onClose={closeForm} onAddEvent={addEvent} />
                  </div>
                </Container>
              </div>
            </>
          )}
          <AddEvent open={isFormOpen} onClose={closeForm} onAddEvent={addEvent} />
        </Container>

        {/* View All events section */}
        <div className='pageBreak viewEvents'>
          <Container>
            <Typography variant="h2" align='center' color="#000">
              {t('info6')}
            </Typography>
            <Typography className="viewalPara" variant="h5" align='center' color="rgba(0, 0, 0, 0.6)">
              {t('info7')}
            </Typography>
            {/* Displaying all events */}
            <Grid className="searchResult allEvent" container spacing={4}>
              {events.slice().reverse().map((event: Event) => (
                <Grid item key={event._id} xs={12} sm={6} md={4}>
                  <Card className='cards'
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia className='cardImage'
                      component="div"
                      sx={{
                        pt: '56.25%', // 16:9
                      }}
                      image={getRandomImage()}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h5" color="#000">
                        {event.Event_Name}
                      </Typography>
                      <Typography>
                        Location : {event.Room_Number} - {event.Location}
                      </Typography>
                      <Typography>
                        Date : {event.Date}
                      </Typography>
                      <Typography>
                        Time : {event.Event_Start_Time} - {event.Event_End_Time}
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
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
};

export default EventListPage;
