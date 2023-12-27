import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentForm from '../../components/Payment/PaymentForm';
import { stripePublicKey } from '../../components/Payment/config';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const stripePromise = loadStripe(stripePublicKey);

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='payment'>
      <Button className="buyTicket" onClick={handleOpen}>Buy Tickets</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" align='center' variant="h4" component="h4">
              Get tickets
            </Typography>
            <Typography align='center' variant="h6" component="h6">
            Grab your tickets now and be part of the unforgettable experience. Let the excitement begin!
            </Typography>
            <TextField sx={{margin:'8% 15%'}} id="outlined-basic" label="Number of Tickets" variant="outlined" />
            <Elements stripe={stripePromise}>
                  <PaymentForm />
            </Elements>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}