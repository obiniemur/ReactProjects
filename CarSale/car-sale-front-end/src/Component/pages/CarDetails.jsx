import {useContext} from "react";
import {useLoaderData, useParams} from "react-router-dom";
// import {dataContext} from "../Authprovider/ContextProvider";
import Swal from 'sweetalert2'

const CarDetails = () => {
  const loadingData = useLoaderData();
  console.log(loadingData);

  const name = loadingData.name;
  const price = loadingData.price;
  const img = loadingData.img;
  const carDetailsData = {name, price, img};

  // const {user} = useContext(dataContext);

  const handleAddCart = () => {
    fetch("https://obi-car-shop-backend.vercel.app/details/6530a38fa7d760c5cb140f92", {
      method: "post",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(carDetailsData),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId){
          Swal.fire('Product is added to your cart')
        }
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={loadingData.img} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{loadingData.name}</h1>
          <p className="py-2">Description: {loadingData.details}</p>
          <p className="py-2">Price: ${loadingData.price}</p>

          <button onClick={handleAddCart} className="btn btn-primary">
            Add to your List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
