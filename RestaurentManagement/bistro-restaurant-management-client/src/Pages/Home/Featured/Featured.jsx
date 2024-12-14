import SectionTitles from "../../../components/SectionTitle/SectionTitles";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured-item text-white pt-8 my-20">

            <SectionTitles subHeading="Check it out" heading="Featured Item" />
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 md:px-36">
                <div>
                    <img src={featuredImg} alt="featured" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can I get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea minima sequi, perferendis asperiores sapiente cum soluta non nostrum id totam deserunt enim, consequuntur natus corrupti tenetur beatae autem ipsum distinctio quo aliquam alias tempore illum voluptate rem. Dicta veritatis quibusdam repellendus, deleniti recusandae eius eaque labore consectetur culpa mollitia cumque.</p>
                    <div className=" text-center md:text-left"><button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button></div>
                </div>
            </div>
            
        </div>
    );
};

export default Featured;