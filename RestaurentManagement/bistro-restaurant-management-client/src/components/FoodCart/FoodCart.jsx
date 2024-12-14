import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseCart from "../../Hooks/UseCart";

const FoodCart = ({item}) => {
  const {user} = useAuth();
  const {name, image, price, recipe, _id} = item;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [,refetch] =UseCart()

  const handleAddtoCart = () => {
    if (user && user.email) {
      

      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} has been added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          //refetch cart to update the cart item count
          refetch()
        }
      });
    } else {
      Swal.fire({
        title: "You're not logged in",
        text: "Please Login to add the product to your car",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Please Log In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state: {from: location}});
        }
      });
    }
  };
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={name} className="rounded-xl" />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">${price}</p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={handleAddtoCart}
            className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
