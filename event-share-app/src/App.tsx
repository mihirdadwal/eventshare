import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Footer/Footer.css';
import './pages/home/welcome.css';
import './components/Header/Navbar.css';
import './pages/SignIn/signin.css';
import RoutesPage from './pages/RoutesPage'
import * as eventService from './services/event-service';

import { useDispatch } from 'react-redux';
import { loadEvents }  from './store/slices/event-slice';
import { AppDispatch } from './store/index';

const App :React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();      //redux

  useEffect(() => {
    // eventService.search().then((events) => setEvents(events));     //fetching data from database(before redux)
    eventService.search().then((events) => dispatch(loadEvents(events)));
    
  });

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <RoutesPage/>
      </div>
    </div>

  );
}
 
export default App;