import {MdDelete} from "react-icons/md";
import useMenu from "../../../Hooks/useMenu";
import SectionTitles from "../../../components/SectionTitle/SectionTitles";
import {FaEdit} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {Link} from "react-router-dom";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          // to update the interface after delete, we can use refetch from tanstack
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };



  return (
    <div>
      <SectionTitles heading="Manage All Items" subHeading="Hurry Up"></SectionTitles>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Pricer</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="text-right">${item.price}</td>
                <td>
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button
                      className="btn btn-md bg-orange-500">
                      <FaEdit className="text-white" />
                    </button>
                  </Link>
                </td>

                <td>
                  <button
                    onClick={() => {
                      handleDeleteItem(item);
                    }}
                    className="btn btn-ghost btn-lg text-red-500">
                    <MdDelete className="text-3xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
