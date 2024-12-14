import {useLoaderData, useParams} from "react-router-dom";

const ServicesDeatils = () => {
  const data = useLoaderData();
  const dataId = useParams();
  const dataFilter = data.filter((e) => parseInt(e.id) === parseInt(dataId.id));
  console.log("filtered", dataFilter);
  return (
    <div className="max-w-5xl mx-auto mt-10 ">
      {dataFilter.map((f) => {
        return (
          <div key={f.id}>
            <div className="relative">
              <img className="w-full rounded-t-2xl" src={f.slider_images} alt="" />
              <div className="absolute bottom-0 bg-neutral-600 opacity-60 text-white font-fontType font-extrabold text-2xl md:text-3xl w-full pl-3 md:pl-5">Price Range: {f.price_range}</div>
            </div>
            <div className="mt-9 px-2">
                <p className="font-fontType font-extrabold text-3xl">{f.category} Events</p>
                <p className="font-fontType text-base text-justify text-slate-500">{f.detail}</p>
            </div>

            <button className="my-5 w-full   btn btn-neutral">Book Now</button>
         
          </div>
        );
      })}
    </div>
  );
};

export default ServicesDeatils;
