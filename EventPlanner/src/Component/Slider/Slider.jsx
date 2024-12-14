import {useContext} from "react";
import {dataProvider} from "../Context/DataContext";
import { NavLink } from "react-router-dom";

const Slider = () => {
  const {data} = useContext(dataProvider);
 
  return (
    <>
      <h1 className="z-10 text-2xl lg:text-6xl md:text-4xl absolute top-1/3 md:top-2/5 left-10 md:left-1/4 font-fontType font-extrabold text-white">
        <p className="break-words text-center text-stone-400">Michigan</p> Creative Corner Event Planner
      </h1>
      <div className="carousel w-full  relative">
        {data.map((d) => {
          return (
            <div key={d.id} id={`slide${parseInt(d.id)}`} className="carousel-item relative w-full  h-[800px]">
              <img src={d.image} className="w-full  brightness-50" />

              <div className="absolute top-[40%] md:top-1/3 lg:top-1/2 left-24 md:left-[31%]">
                <h1 className="lg:text-7xl md:text-5xl text-2xl font-fontType font-bold text-white">{d.category} Events</h1>
                <div className="text-center mt-14">
                <NavLink to={`/booking/${d.id}`}><button className="btn btn-neutral">Book Now</button></NavLink>
                </div>
              </div>

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${parseInt(d.id) - 1}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${parseInt(d.id) + 1}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Slider;
