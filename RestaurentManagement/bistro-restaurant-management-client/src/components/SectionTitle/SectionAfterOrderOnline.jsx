import chef from "../../assets/home/chef-service.jpg";
const SectionAfterOrderOnline = () => {
  return (
    <div className="relative mb-10">
      <img src={chef} alt="" />
      <div className="absolute top-1/3 md:left-[20%] bg-white md:w-[800px] h-[60%] md:h-1/2 mx-auto">
        <div className=" md:w-[692px] text-center mx-auto md:mt-10">
          <h1 className="md:text-4xl mb-2">Bistro Boss</h1>
          <p>Elevate your senses at [Bristo Boss], where taste meets artistry.</p>
        </div>
      </div>
    </div>
  );
};

export default SectionAfterOrderOnline;
