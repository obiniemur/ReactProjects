import SectionTitles from "../../Components/SectionTitles";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import GetNotification from "../GetNotification/GetNotification";
import MidSection from "../MidSection_Vital/MidSection";
import OurCategories from "../OurCategories/OurCategories";

const Home = () => {
    return (
        <div>

            <Banner />
            <SectionTitles title="Top Categories" />
            <OurCategories />
            <MidSection />
            <SectionTitles title="Get Notified" />
            <GetNotification />
            <AboutUs />
            
        </div>
    );
};

export default Home;