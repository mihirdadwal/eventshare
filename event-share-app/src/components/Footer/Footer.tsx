import React from 'react';
import '../Footer/Footer.css';
import { Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import MuiLink from '@mui/material/Link';

const Footer = () => {
  function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{color:'#fff'}}>
      {'Copyright © '}
      <MuiLink href="/">
        EventShare
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="footerContainerLeft">
          <Typography variant="h6" component="h2" sx={{color:'#fff'}}>
            <Link href="https://www.northeastern.edu/" target="_blank" underline="none"> 
              Northeastern University
            </Link>
          </Typography>
          <div className='footwrap'>
              <Link href='https://admissions.northeastern.edu/student-life/' target='_blank' underline="none"><b>Boston</b></Link>
              <Link href='https://arlington.northeastern.edu/' target='_blank' underline="none">Arlington</Link>
              <Link href='https://www.burlington.northeastern.edu/' target='_blank' underline="none">Burlington</Link>
              <Link href='https://charlotte.northeastern.edu/' target='_blank' underline="none">Charlotte</Link>
              <Link href='https://www.nulondon.ac.uk/' target='_blank' underline="none">London</Link>
              <Link href='http://miami.northeastern.edu/' target='_blank' underline="none">Miami</Link>
              <Link href='https://csi.northeastern.edu/' target='_blank' underline="none">Nahant</Link>
              <Link href='https://oakland.northeastern.edu/' target='_blank' underline="none">Oakland</Link>
              <Link href='https://roux.northeastern.edu/' target='_blank' underline="none">Portland</Link>
              <Link href='https://seattle.northeastern.edu/' target='_blank' underline="none">Seattle</Link>
              <Link href='http://siliconvalley.northeastern.edu/' target='_blank' underline="none">Silicon Valley</Link>
              <Link href='https://toronto.northeastern.edu/' target='_blank' underline="none">Toronto</Link>
              <Link href='https://vancouver.northeastern.edu/' target='_blank' underline="none">Vancouver</Link>
          </div>
          <div className='footwrap footwrap1'>
              <Link href='https://www.northeastern.edu/emergency-information' target='_blank' underline="none">Emergency Information</Link>
              <span className='lineBreak'>|</span>
              <Link href='https://www.northeastern.edu/privacy-information' target='_blank' underline="none">Privacy Information</Link>
              <span className='lineBreak'>|</span>
              <Link href='https://policies.northeastern.edu/policy122/' target='_blank' underline="none">Accessibility</Link>
              <span className='lineBreak'>|</span>
              <Copyright />
          </div>
        </div>
        <div  className="footerContainerRight">
          <IconButton href='https://www.facebook.com/northeastern/' target='_blank' aria-label="Facebook" >
              <FacebookIcon sx={{color:'#808080'}}/>
          </IconButton>
          <IconButton href='https://twitter.com/Northeastern' aria-label="Twitter" target='_blank'>
              <TwitterIcon sx={{color:'#808080'}}/>
          </IconButton>
          <IconButton href='https://www.youtube.com/user/Northeastern' aria-label="Youtube" target='_blank'>
              <YouTubeIcon sx={{color:'#808080'}}/>
          </IconButton>
          <IconButton href='https://www.linkedin.com/school/northeastern-university/posts/?feedView=all' aria-label="LinkedIn" target='_blank'>
              <LinkedInIcon sx={{color:'#808080'}}/>
          </IconButton>
          <IconButton href='https://www.instagram.com/northeastern/' aria-label="Instagram" target='_blank'>
              <InstagramIcon sx={{color:'#808080'}}/>
          </IconButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;