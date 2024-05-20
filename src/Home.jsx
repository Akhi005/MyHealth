import React from 'react';
import Header from './Header';
import Banner from './Banner';
import About from './About';
import Services from './Services';
import Content from './Content/Content';
import Doctors from './Doctors';
import Diagonostic from './Diagonostic';
import Footer_last from './Footer_last';
const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <About></About>
            <Services></Services>
            <Content></Content>
            <Doctors></Doctors>
            <Diagonostic></Diagonostic>
            <Footer_last></Footer_last>
        </div>
    );
};

export default Home;