import dogwithwoman from "../../assets/Images/midSection/womananddog.png";
const MidSection = () => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto mt-24 px-4 md:py-0">
        <div className="flex flex-col md:flex-row justify-evenly items-center">
          <div className="md:w-1/2 pr-4">
            <h1 className="font-Dancing font-bold text-center">
              -----PUP<span className="text-red-600">HUB-----</span>
            </h1>

            <p className="font-Poppins text-xl md:text-2xl font-semibold text-justify">Be a hero for the voiceless. Your support empowers us to create a haven for those who cannot speak for themselves. Together, lets build a community of compassion and change countless lives.</p>
            <button className="btn btn-outline btn-error btn-sm mt-4">Donate Us</button>
          </div>

          <div className=" bg-red-500 md:bg-[#FFC632] h-[200px] md:h-[400px] w-1/2 relative mt-10 md:mt-0">
            <img className="absolute -top-8 -right-4 h-[200px] md:h-[400px] w-[620px] shadow-2xl" src={dogwithwoman} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidSection;
