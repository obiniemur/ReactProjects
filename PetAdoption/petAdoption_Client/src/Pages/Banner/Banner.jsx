import bannerimg1 from "../../assets/Images/Banner/Dog1.png";
const Banner = () => {
  return (
    <div className="bg-[#FFC632] bg-banner-section bg-contain bg-no-repeat md:bg-right-bottom">
      <div className="max-w-7xl mx-auto flex-col-reverse  flex md:flex-row justify-between items-center">
        <div className="md:w-[650px] font-Roboto my-4 mx-2">
          <h1 className="text-center font-Dancing font-bold">
            -----PUP<span className="text-red-600">HUB-----</span>
          </h1>
          <h3 className="font-Roboto text-2xl md:text-4xl font-bold uppercase py-4">Pet Adoption Center</h3>
          <p className="text-justify first-letter:font-Poppins text-xl">Welcome to PUPHUB, where hearts and paws connect. 
          Discover the joy of unconditional love by adopting a pet today. Browse our adorable companions waiting for a forever home. 
          Together, lets make tails wag and hearts soar. Adopt, dont shop!</p>
          <div className="flex my-4">
            <button className="btn btn-outline btn-error mr-4">Vier All Listing</button>
            <button className="btn btn-outline btn-error">Donate Us</button>
          </div>
        </div>
        <div className="bg-banner-section2 bg-contain bg-no-repeat bg-right-bottom w-[340px]  md:w-auto">
          <img className="md:h-[600px]" src={bannerimg1} alt="" />
          
        </div>
      </div>
    </div>
  );
};

export default Banner;
