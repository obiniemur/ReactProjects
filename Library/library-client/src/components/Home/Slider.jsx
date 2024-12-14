import {useRef} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import slider1 from "../../assets/slide1.jpg";
import slider2 from "../../assets/slide2.jpg";
import slider3 from "../../assets/slide3.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SliderCss.css";

import {Autoplay, Pagination, Navigation} from "swiper/modules";

const Slider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  AOS.init();

  return (
    <div className="relative " >
        <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper md:h-[690px]  bg-blend-overlay  bg-gray-900   brightness-50">
        <SwiperSlide>
          <img src={slider1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src={slider1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="" />
        </SwiperSlide> */}

        <div className="autoplay-progress" slot="container-end" >
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      </div>

     
      <div className="hero-content text-center text-neutral-content absolute bottom-0 md:top-1/4 lg:top-1/3 lg:right-1/3 md:right-1/4 z-50 "  data-aos="fade-up">
        <div className="max-w-lg">
          <h1 className="mb-5 text-xl md:text-5xl font-bold">Find Your Book Here</h1>
          <p className="mb-5">Explore worlds beyond imagination with our curated collection of captivating reads. From thrilling adventures to heartwarming tales, find your next literary escape at Warren Library</p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
  );
};

export default Slider;
