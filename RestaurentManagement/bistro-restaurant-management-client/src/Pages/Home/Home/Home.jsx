import { Helmet } from "react-helmet-async";
import Phone from "../../../components/SectionTitle/Phone";
import SectionAfterOrderOnline from "../../../components/SectionTitle/SectionAfterOrderOnline";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefRecommend from "../ChefRecommend/ChefRecommend";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import TestiMonials from "../Testimonials/TestiMonials";

const Home = () => {
    return (
        <div>

<Helmet>
        <title>Bistro Home</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>

            <Banner />
            <Category />
            <SectionAfterOrderOnline />
            <PopularMenu />
            <Phone />
            <ChefRecommend />
            <Featured />
            <TestiMonials />
            
        </div>
    );
};

export default Home;