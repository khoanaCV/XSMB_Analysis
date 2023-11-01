import React from 'react';
import AboutService from '../../../components/AboutService/AboutService';
import LatestBlog from '../../../components/LatestBlog/LatestBlog';
import Appoinment from '../../Home/Appoinment/Appoinment';
import Content from '../AboutContent/Content';
import Banner from '../Banner/Banner';

const About = () => {
    return (
        <>
          <Banner />
          <Content /> 
          <AboutService />
          <LatestBlog />
          <Appoinment />
        </>
    );
};

export default About;