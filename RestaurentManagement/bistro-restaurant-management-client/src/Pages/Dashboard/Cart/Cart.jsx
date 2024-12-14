import Swal from "sweetalert2";
import UseCart from "../../../Hooks/UseCart";
import {MdDelete} from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = UseCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
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
        axiosSecure
          .delete(`/carts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${id} has been deleted from MongoDB database`,
                icon: "success",
              });
              refetch()
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div>
      <div className=" md:flex justify-evenly mb-10">
        <h2 className="text-xl md:text-4xl mb-2">Total Items: {cart.length}</h2>
        <h2 className="text-xl md:text-4xl mb-2">Total Price: {totalPrice}</h2>
        <div className="text-center md:text-left">
          {
            cart.length ? <Link to="/dashboard/payment"><button className="btn btn-primary">Pay</button></Link> : <button disabled className="btn btn-primary">Pay</button>
          }
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <th>
                  <button
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                    className="btn btn-ghost btn-lg text-red-500">
                    <MdDelete />
                  </button>
                </th>
              </tr>
            ))}

            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
