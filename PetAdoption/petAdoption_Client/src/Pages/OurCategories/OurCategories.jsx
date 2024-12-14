import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination} from "swiper/modules";
import {FaArrowRight} from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import './OurCategories.css'
const OurCategories = () => {
  const axiosPublic = useAxiosPublic();
  const {data: category = []} = useQuery({
    queryKey: ["Pet_Category"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={20}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {category?.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div>
              <img className="md:h-[300px] h-[180px] w-screen" src={cat.petImage} alt="category of pet" />
            </div>
            <div className="flex justify-between pt-4">
              <div>
                <p className="text-yellow-500 font-Roboto text-2xl uppercase">{cat.category}</p>
              </div>
              <Link to={`/pet/${cat.category}`}>
                <div className="bg-yellow-500 p-1 z-40 text-white">
                  <FaArrowRight />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurCategories;
