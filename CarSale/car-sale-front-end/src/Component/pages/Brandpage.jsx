import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// import Slider from "../HomePage/Slider";
import SliderBrand from "./SliderBrand";
import BrandContent from "./BrandContent";


const Brandpage = () => {
  const [cars, setCars] = useState([]);

  const {brand_name} = useParams();
  console.log(cars);

  useEffect(() => {
    fetch(`https://obi-car-shop-backend.vercel.app/brands/${brand_name}`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <>
      <div className="carousel w-full">
        {cars.map((car) => {
          return (
            <>
              
              <SliderBrand key={car._id} img={car.img} id={car._id} brandImg={car.brand.slider_image3}  />
        
            </>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3  mx-auto gap-4 px-4">
        {cars.map(c=> <BrandContent key={c._id} img={c.img} name={c.name} id={c._id} brand_name={brand_name} details={c.details} />)}
      </div>




    </>
  );
};

export default Brandpage;
