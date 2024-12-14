
const Slider = () => {
    return (
        <div className="hero min-h-[600px]" style={{backgroundImage: 'url(https://i.ibb.co/Gnm7xBg/banner2.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Michigan Used Cars</h1>
            <p className="mb-5">Find your dream cars here in a affordable price</p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    );
};

export default Slider;