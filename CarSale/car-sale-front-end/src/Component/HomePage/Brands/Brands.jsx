import {useEffect, useState} from "react";
import Brand from "./Brand";

import axios from 'axios';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);

  //   fetch("https://obi-car-shop-backend.vercel.app/carbrands")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBrands(data);
  //       setLoading(false);
  //     });
  // }, []);


  useEffect(()=>{

    axios.get("https://obi-car-shop-backend.vercel.app/carbrands")
    .then(data=> {
      setBrands(data.data)
      console.log(loading)
      setLoading(false)
    })
    .catch(err=>(console.log(err.message)))



  },[])





  return (
    <>
      {loading ? (
        <div className="text-center mx-10">
            <div>Hello, Please be patient. Sometime the backend server is little slow due to free hosting.</div>
          <span className="loading loading-bars w-40 text-slate-950 text "></span>
        </div>
      ) : (
        <div className="grid gap-2 grid-cols-2 w-full md:grid-cols-3 max-w-5xl mx-auto px-4 md:px-0">
          {brands.map((b) => (
            <Brand key={b._id} brandname={b.brand.convert_Brand} img={b.img} />
          ))}
        </div>
      )}
    </>
  );
};

export default Brands;
