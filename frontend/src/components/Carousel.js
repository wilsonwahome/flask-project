import React from 'react';
import Slider from 'react-slick';
import './Carousel.css'; // Your custom styles for the carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png'; // Replace with your actual image paths
import 'bootstrap/dist/css/bootstrap.min.css';


const Carousel = () => {
  // Assuming sequential image names in the assets folder
  const carouselItems = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
    { image: image4 },
    { image: image5 }, // Add more images as needed
  ];

  // Slick settings configuration
  const settings = {
    dots: true, // Show dots navigation
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Auto play speed in milliseconds
    adaptiveHeight: true, // Adjusts height based on content
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img
              src={process.env.PUBLIC_URL + item.image}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
            <div className="carousel-caption">{item.caption}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
