import React from 'react'
import Header from './Header'
import Banner from './home/Banner'
import About from './home/About'
import Services from './home/services/Services'
import Content from './home/Article'
import Doctors from './home/Doctors'
import Diagonostic from './home/Diagonostic'
import Footer from './Footer'

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <About />
      <Services />
      <Content />
      <Doctors />
      <Diagonostic />
      <Footer />
    </div>
  )
}

export default Home
