import React, { useState } from "react";
import { images } from "./SliderData";
import SliderUI from "./SliderUI";

const SliderLogic = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevImage = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <SliderUI
      images={images}
      currentSlide={currentSlide}
      prevImage={prevImage}
      nextImage={nextImage}
    />
  );
};

export default SliderLogic;
