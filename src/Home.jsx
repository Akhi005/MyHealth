import React from 'react'
import Header from './Header'
import Banner from './Banner'
import About from './About'
import Services from './Services'
import Content from './components/Content'
import Doctors from './Doctors'
import Diagonostic from './Diagonostic'
import Footer from './Footer'

const Home = () => {
  return (
    <div className='w-full'>
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
