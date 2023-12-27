import React, { useState, useEffect } from 'react';
import SignIn from '../SignIn/SignIn';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import NEU_logo from '../../images/NEU_logo.png';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/Footer/Footer';
 
const Welcome = () => {
  const { t } = useTranslation('common');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // List of images for the carousel
  const images = [
    '/img/pic1.jpeg',
    '/img/pic2.jpg',
    '/img/pic3.jpeg',
  ];

  // Function to handle image change
  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
 
  // Use useEffect to set up the interval for automatic image change
  useEffect(() => {
    const intervalId = setInterval(changeImage, 2000); // Change image every 2 seconds/2000 milliseconds
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <><div className="welcome-div">
      <div className="image-carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={index === currentImageIndex ? 'active' : ''} />
        ))}
      </div>
      <div className='login_buttons drop-in-2'>
        <Button className="logins" href="/signIn" sx={{ background: '#fff', borderRadius: '30px', color: '#000', padding: '10px 40px' }} endIcon={<ArrowForwardOutlinedIcon />}>{t('button1')}</Button>
      </div>

      <div className='neuLogo'>
        <Link href="https://www.northeastern.edu/" target="_blank">
          <img src={NEU_logo} alt='Northeastern Logo' />
        </Link>
      </div>
      <div className='eventShare drop-in'>
        <Typography className="eventShare_heading" variant="h1" component="h2" sx={{ color: '#fff', fontWeight: 'Bold' }}>
          {t('title1')}
        </Typography>
      </div>
    </div><Footer /></>
  );
};
 
export default Welcome;