// EventDetailPage.tsx

import React from 'react';
import { Typography, Container, Paper, Grid } from '@mui/material';

interface EventDetailProps {
  eventId: number;
  onClose: () => void;
}

const events = {
  1: { name: 'University Day', audience: 'Students', location: 'Main Auditorium', imageUrl: 'url-to-image' },
  // Add details for other events
};

const EventDetailPage: React.FC<EventDetailProps> = ({ eventId, onClose }) => {
  const event = events[1];

  if (!event) {
    return <Container><Typography variant="h6">Event not found</Typography></Container>;
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <img src={event.imageUrl} alt={event.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      </Paper>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'left' }}>
        <Typography variant="h4" gutterBottom>
          {event.name}
        </Typography>
        <Typography variant="body1" paragraph>
          <span style={{ fontWeight: 'bold' }}>Audience:</span> {event.audience}
        </Typography>
        <Typography variant="body1" paragraph>
          Location: {event.location}
        </Typography>
        {/* Add more details as needed */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={onClose} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </Paper>
    </Container>
  );
};

export default EventDetailPage;
