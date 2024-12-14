import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {MdDelete} from "react-icons/md";
import {FaUsers} from "react-icons/fa";
import Swal from "sweetalert2";

const Allusers = () => {
  const axiosSecure = useAxiosSecure();

  const {refetch, data: users = []} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data;
    },
  });

  const handleDelete = (user) => {
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
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${user._id} has been deleted from MongoDB database`,
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const makeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make the user an Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          refetch();
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Done!",
              text: `${user.name} is now an Admin`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex  justify-evenly my-4">
        <h2 className="text-3xl"> All Users </h2>
        <h2 className="text-3xl"> Total Users: {users.length} </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button className="btn  bg-orange-500 text-white" onClick={() => makeAdmin(user)}>
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(user)}>
                    <MdDelete className="text-red-500 text-xl" />
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

export default Allusers;
