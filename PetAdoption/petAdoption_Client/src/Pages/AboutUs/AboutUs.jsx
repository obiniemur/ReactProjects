import heroImg from "../../assets/Images/Other/pet8.jpg";
const AboutUs = () => {
  return (
    <div className="my-4">
      <div className="hero min-h-screen my-4 bg-cover bg-no-repeat" style={{backgroundImage: `url(${heroImg})`}}>
        <div className="hero-overlay bg-opacity-80 brightness-50">

        </div>
        <div className="hero-content  text-neutral-content">
          <div className=" flex md:flex-row flex-col-reverse items-center justify-around">
            <div className="max-w-lg mt-4">
              <h1 className="font-Dancing font-bold">
                -----PUP<span className="text-red-600">HUB-----</span>
              </h1>
              <h1 className="mb-5 text-5xl font-bold">About Us</h1>
              <p className="mb-5 text-justify">At PUPHUB, we are more than just a pet adoption platform; we are a non-profit family driven by a shared passion for animal welfare. Committed to the well-being of our furry friends, we operate solely on the generosity of individuals like you. As a non-profit organization, every adoption, every contribution, and every act of kindness fuels our mission to provide a safe haven for animals in need. Your donations power our efforts to rescue, care for, and find loving homes for pets, making a tangible impact on countless lives. Join us in this journey of compassion, where together, we shape a brighter future for every paw that finds its way to our care.</p>
              <button className="btn btn-warning">Contact Us</button>
            </div>
            <div className="max-w-md md:ml-10">
              <img src={heroImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
