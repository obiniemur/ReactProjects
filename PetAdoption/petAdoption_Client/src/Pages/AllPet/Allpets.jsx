import {useQuery} from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./AllPet.css";

import {Grid, Pagination} from "swiper/modules";
import {Link} from "react-router-dom";

const Allpets = () => {
  const axiosPublic = useAxiosPublic();
  const {data = []} = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pets");
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Swiper
        slidesPerView={3}
        grid={{
          rows: 3,
        }}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper">
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <div className=" bg-yellow-500 md:h-80 h-60  ">
              <div>
                <img className="md:h-52 h-full w-full md:w-full" src={item.petImage} alt="" />
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <p>{item.name}</p>
                </div>
                <p>age: {item.age}</p>
              </div>
              <div className="flex justify-between flex-col md:flex-row">
                <div>
                    Location: {item.location}
                </div>
                <div className="">
                  {!item.adoption ? (
                    <Link to={`/pet/${item.category}/${item._id}`}>
                      <button className="btn btn-outline btn-sm">View Details</button>
                    </Link>
                  ) : (
                    <button className="btn btn-disabled btn-sm">View Details</button>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Allpets;
