const GetNotification = () => {
  return (
    <div className="text-center relative mb-10">
      <input  type="text" placeholder="Enter Your Email Here" className="input input-bordered input-warning w-full max-w-2xl " />
      <button className="btn btn-md btn-warning absolute rounded-l right-[2px]  lg:right-[24%]">Subscribe</button>
    </div>
  );
};

export default GetNotification;
