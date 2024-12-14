import { Outlet } from "react-router-dom";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer/Footer";

const Root = () => {
    return (
        <div>

            {/* <div className="absolute z-10 left-0 right-0 mix-blend-multiply "><Navbar /></div> */}
            <Navbar />
            <Outlet />
            <Footer />
            
            
        </div>
    );
};

export default Root;