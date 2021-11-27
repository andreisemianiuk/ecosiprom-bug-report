import React from 'react'
import {Slide} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import mainOne from '../images/main-1.jpg'
import mainTwo from '../images/main-2.jpg'
import mainThree from '../images/main-3.jpg'


const slideImages = [
  {
    url: `${mainOne}`,
    caption: 'Slide 1',
  },
  {
    url: `${mainTwo}`,
    caption: 'Slide 2',
  },
  {
    url: `${mainThree}`,
    caption: 'Slide 3',
  },
]

export const Slideshow = () => {
  return (
    <div className="slide-container" style={{width: '1000px'}}>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div style={{'backgroundImage': `url(${slideImage.url})`, height: '500px',width: '1000px'}}/>
          </div>
        ))}
      </Slide>
    </div>
  )
}
