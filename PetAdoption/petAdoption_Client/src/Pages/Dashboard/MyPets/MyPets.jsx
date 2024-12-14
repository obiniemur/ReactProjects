import {useState} from "react";
import ReactPaginate from "react-paginate";
import "./Mypets.css";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const MyPets = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {data: pet = [], refetch} = useQuery({
    queryKey: ["user_email", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mypets?email=${user?.email}`);
    //   const res = await axiosSecure.get(`/mypets?email=obi@revize.com`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
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
        const res = await axiosSecure.delete(`/deletePet/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Your listing pet has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const Items = ({currentItems}) => {
    return (
      <>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                {/* <th>Pet Name</th> */}
                {/* <th>Category</th> */}
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {currentItems &&
                currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <th>
                      <p>{index + 1}</p>
                    </th>
                    <td>
                      <div className="flex items-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.petImage} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50">{item.location}</div>
                        </div>
                      </div>
                    </td>

                    {/* <td>{item.category}</td> */}
                    <td>{item.adoption ? <p className="bg-yellow-400 p-2 w-fit">Not Available</p> : <p className="bg-green-400 p-2 w-fit">Available</p>}</td>
                    <td>
                      <Link to={`/dashboard/updatePet/${item._id}`}>
                        <p className="bg-yellow-400 hover:bg-black text-white w-fit p-2 cursor-pointer">
                          <FaEdit />
                        </p>
                      </Link>
                    </td>
                    <td>
                      <p onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-black text-white w-fit p-2 cursor-pointer">
                        <MdDelete />
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  function PaginatedItems({itemsPerPage}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = pet.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(pet.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % pet.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate breakLabel="..." nextLabel="next >" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="< previous" renderOnZeroPageCount={null} className="flex justify-around font-Roboto font-extrabold my-6" />
      </>
    );
  }

  return <PaginatedItems itemsPerPage={10} />;
};

export default MyPets;
