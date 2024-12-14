import SectionTitles from "../../../components/SectionTitle/SectionTitles";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import {useEffect, useState} from "react";
import {Rating} from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from 'react-icons/fa';

const TestiMonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://obi-first-restaurant.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="my-20">
      <SectionTitles subHeading="What our client say" heading="Testimonials" />

      <>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="my-16 mx-24 flex flex-col items-center">
                <Rating style={{maxWidth: 180}} value={review.rating} readOnly />
                <FaQuoteLeft className="mt-10 text-3xl"/>
                <p className="py-8">{review.details}</p>
                <h3 className="text-2xl text-orange-400">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </section>
  );
};

export default TestiMonials;
