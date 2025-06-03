import React from 'react'
import { Carousel } from './Carousel'
import { slides } from '/src/components/home/carouselData.json'
const Article = () => {
  return (
    <div className="mb-10">
      <Carousel data={slides} />
    </div>
  )
}
export default Article
