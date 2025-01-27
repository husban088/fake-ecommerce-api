import React from "react";
import backgroundImage from './bg.webp';
import { Link } from "react-router-dom";
import './hero.css';

const Hero = () => {
    return (
        <section className="text-gray-600 body-font mt-20">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">NEW ARRIVALS
              {/* <br className="hidden lg:inline-block"/>readymade gluten */}
            </h1>
            <p className="mb-8 leading-relaxed text-xl">We've got everything your champion needs to move, play, and conquer the day in comfort and style.</p>
            <div className="flex justify-center">
              <Link to={'/products'} className="buy__btn">Buy now</Link>
              {/* <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button> */}
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="hero__img object-cover object-center rounded" alt="hero" src={backgroundImage}/>
          </div>
        </div>
      </section>
    )
}

export default Hero;