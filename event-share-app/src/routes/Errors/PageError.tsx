import React from "react";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import { Typography, Container } from '@mui/material';
import '../../components/Footer/Footer.css'



export default () => {
    return (
        <><Navbar />
        <div>
        <div className="errorPage">
        <Typography
            component="h1"
            variant="h1"
            color="#fff"
            gutterBottom
          >
            Page Not Found :-|
          </Typography>
        </div>
        </div>
        <Footer /></>
    );
}