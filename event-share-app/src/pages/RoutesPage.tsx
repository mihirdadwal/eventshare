import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes ,useLocation} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import * as eventService from '../services/event-service';
import PageError from '../routes/Errors/PageError';
import Event from '../models/event';
import EventDetailPage from './Event/EventDetailPage';
import EventListPage from './Event/EventListPage';
import Welcome from './home/Welcome';
import SignIn from './SignIn/SignIn';

import { useSelector } from 'react-redux';
import { searchEvents } from '../store/slices/event-slice';
import MyEvents from './Event/MyEvents';



const initialState: Event[] = [];
const initialSelectedEventState: Event = {} as Event;

function RoutesPage() {
  const [eventList, setEvents] = useState<Event[]>(initialState);
  const [isAdmin, setIsAdmin] = useState(false);

  const events = useSelector(searchEvents(''));

  useEffect(() => {
    const storedValue = sessionStorage.getItem('isAdmin');
    const myBooleanValue = storedValue ? JSON.parse(storedValue) : false;
    setIsAdmin(myBooleanValue);
    
  },[]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const back = () => {
    setSelectedEvent(initialSelectedEventState)
    window.location.href = '/event';

    // window.location.reload();

  }
  const [selectedEvent, setSelectedEvent] = useState<Event>(initialSelectedEventState);

  

  return (
    <Router>
      <div>
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 2 , maxWidth: '100% !important', paddingLeft: '0 !important', paddingRight: '0 !important', marginTop: '0 !important'}}>
          <Routes>
            <Route path="/event" element={
              <EventListPage/>
            }>
            </Route>
            <Route path="/myEvents" element={
              <MyEvents/>
            }></Route>
            {events.map((event: Event) => (
              <Route path={`/event/${event._id}`} element={
                <EventDetailPage event_selected={event} onClose={back} isAdmin={isAdmin}/>
              }>
              </Route>
            ))}
            <Route path="/"  element={<Welcome />}/>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="*" element={<PageError />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default RoutesPage;

