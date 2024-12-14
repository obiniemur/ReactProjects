import Aboutus from "./Aboutus/Aboutus";
import Review from "./Review/Review";
// import Reviews from "./Review/Reviews";
import Services from "./Services/Services";
import Slider from "./Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Services />

      <Aboutus />

      <Review />
    </div>
  );
};

export default Home;
