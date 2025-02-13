import React, { useState } from "react";
import SliderLogic from "../components/slider/SliderLogic";

// const images = [
//   {
//     id: 1,
//     url: heroImageOne,
//     title: "Your Wellness App.",
//     text: "Discover all the wellness spots in one place, here.",
//   },
//   {
//     id: 2,
//     url: heroImageTwo,
//     title: "Wherever you want.",
//     text: "You choose your own schedule",
//   },
//   {
//     id: 3,
//     url: heroImageThree,
//     title: "See more informations",
//     text: "Find out more information about the places",
//   },
// ];

const HomePage = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  // };

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1 + images.length) % images.length);
  // };

  return (
    <>
      <SliderLogic />
    </>
  );
};
// <div className="relative w-full h-screen overflow-hidden">
//   {images.map((image, id) => (
//     <div
//       key={id}
//       className={`absolute inset-0 transition-opacity duration-1000 ${
//         id === currentSlide ? "opacity-100" : "opacity-0"
//       }`}
//       style={{
//         backgroundImage: `url(${image.url})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/40 bg-opacity-50 flex flex-col justify-center items-center text-white text-center py-6 px-24">
//         <div className="">
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
//             {image.title}
//           </h1>
//           <p className="mt-2 text-lg md:text-2xl tracking-tight font-light">
//             {image.text}
//           </p>
//           <Link to="/map">
//             <button className="mt-4 border-2 uppercase font-medium border-white rounded-lg px-10 py-2 cursor-pointer">
//               See More
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   ))}

//   <button
//     onClick={prevSlide}
//     className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-300 p-2 md:p-4 hover:text-white transition duration-200"
//   >
//     ◀
//   </button>

//   <button
//     onClick={nextSlide}
//     className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-300 p-2 md:p-4 hover:text-white transition duration-200"
//   >
//     ▶
//   </button>
// </div>

// export default HomePage;

//   );
// };

export default HomePage;
