import {useContext, useState} from "react";
import {GrEdit} from "react-icons/gr";
import {RiDeleteBin6Line} from 'react-icons/ri'
import {useLoaderData} from "react-router-dom";
import Swal from "sweetalert2";
import { dataContext } from "../Authprovider/ContextProvider";

const MyCart = () => {
  const loadedData = useLoaderData();
  const [saveCar, setSaveCar] = useState(loadedData);

  const {user} = useContext(dataContext)

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // `https://obi-car-shop-backend.vercel.app/delete/${id}`
        fetch(`https://obi-car-shop-backend.vercel.app/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const remain = saveCar.filter((f) => f._id !== id);
              setSaveCar(remain);
            }
          });
      }
    });
  };

  return (
    <div className="my-20 mx-4">
      {!user && <p className="text-center mb-10 bg-green-500 text-white w-[500px] mx-auto rounded-2xl p-4">Log in to delete product from your cart</p>
}
      {saveCar.map((data) => {
        return (
          <div key={data._id}>
            <div className="flex mt-4 justify-between md:max-w-5xl md:mx-auto items-center gap-4">
              <div className="flex items-center justify-evenly gap-4">
                {user&& <RiDeleteBin6Line className="cursor-pointer" onClick={() => handleDelete(data._id)} />}
                {/* <p onClick={()=>handleDelete(data._id)}>Delete</p> */}
                <img className="w-[100px] h-[100px] md:w-[200px] md:h-[150px]" src={data.img} alt="" />
                <p className="md:ml-4">Model: {data.name}</p>
              </div>

              <div>
                <p>Price: ${data.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCart;
