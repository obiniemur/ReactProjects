// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "./qlink_about_us.css";

import qlink from "../../../assets/quick1.jpg";
import qlink1 from "../../../assets/quick2.jpg";
import qlink2 from "../../../assets/quick3.jpg";
import qlink3 from "../../../assets/quick4.jpg";

const Aboutus = () => {
  return (
    <div className="bg-[#f5f5f5]">
    <div className="max-w-7xl mx-auto p-4">
      <div className="w-[200px] mx-auto ">
        <h1 className="text-center my-4 text-2xl">
          About <span>US</span>
        </h1>
        <hr className="border-[1px] mb-4 border-blue-500" />
      </div>

      <p className="text-justify mb-4">we are more than just a repository of books; we are a haven for knowledge seekers and literary enthusiasts. Our mission is to cultivate a vibrant community of readers, providing a diverse and curated selection of literature to inspire, educate, and ignite imaginations. Step into a world of words with us, where every page holds the promise of discovery</p>

      <div className="flex flex-col-reverse  md:flex-row justify-between text-[#5b5b5b]">
        <div className="grid  md:grid-cols-2 gap-4 mt-10 text-center ">
          <div>
            <h1 className="text-2xl">Member Card</h1>
            <p className="text-sm">We allow our resident to create member cards</p>
          </div>

          <div>
            <h1 className="text-2xl">High quality Books</h1>
            <p>Find all the high quality books here in our public library</p>
          </div>

          <div>
            <h1 className="text-2xl">Free Books</h1>
            <p>You can find a lot of free books</p>
          </div>

          <div>
            <h1 className="text-2xl">Up to Date Book</h1>
            <p>We have a largest up to date inventory</p>
          </div>
        </div>

        <div className="" id="quick_links">
          <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="mySwiper">
            <SwiperSlide>
              <img src={qlink} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={qlink1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={qlink2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={qlink3} alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Aboutus;
