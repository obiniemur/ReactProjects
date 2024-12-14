import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const Aboutus = () => {


  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <div className="max-w-5xl mx-auto font-fontType mt-7 px-4" data-aos="fade-right">
      <h1 className="text-4xl ">Explore Michigan Creative Corner</h1>

      <div className="stats shadow w-auto lg:w-full grid grid-rows-3 md:grid-rows-1 ">
        <div className="stat place-items-center">
          <div className="stat-title">Total Event Organized</div>
          <div className="stat-value">200</div>
          
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Friendly Team Member</div>
          <div className="stat-value text-secondary">127 </div>
          
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Awards</div>
          <div className="stat-value">5</div>
          
        </div>
      </div>
      <p className="text-justify indent-5 mt-5">we are your dedicated event management experts, committed to crafting unforgettable experiences for every occasion. With our passion for creativity and meticulous attention to detail, we turn your dreams into reality. Whether it's a romantic wedding, a joyful birthday celebration, an impactful charity gala, a professional conference, or any other special event, we specialize in bringing your vision to life. Our personalized approach ensures that every element is tailored to your unique style and preferences. Leave the stress of planning to us, and let us create an event that leaves a lasting impression. Contact us today to start planning your perfect event.</p>
      
    </div>
  );
};

export default Aboutus;
