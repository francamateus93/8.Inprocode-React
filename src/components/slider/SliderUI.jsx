import React from "react";
import { Link } from "react-router-dom";

const SliderUI = ({ images, currentSlide, prevImage, nextImage }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${images[currentSlide].url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 bg-opacity-50 flex flex-col justify-center items-center text-white text-center py-6 px-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            {images[currentSlide].title}
          </h1>
          <p className="mt-2 text-lg md:text-2xl tracking-tight font-light">
            {images[currentSlide].text}
          </p>
          <Link to="/map">
            <button className="mt-4 border-2 uppercase font-medium border-white rounded-lg px-10 py-2 cursor-pointer">
              See More
            </button>
          </Link>
        </div>
      </div>

      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300 p-2 md:p-4 hover:text-white transition duration-200"
      >
        ◀
      </button>

      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-300 p-2 md:p-4 hover:text-white transition duration-200"
      >
        ▶
      </button>
    </div>
  );
};

export default SliderUI;
