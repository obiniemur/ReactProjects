import {useEffect, useState} from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { MdDelete  } from "react-icons/md";
import axios from "axios";



const BorrowedBook = () => {
  const {user} = useAuth();
  console.log('user from borrower', user.email)
  const [borrowed, setBorrowed] = useState([]);
  const axiosSecure = useAxiosSecure();

  const url = `/borrowed?email=${user?.email}`;
  useEffect(() => {
    axiosSecure.get(url).then((res) => setBorrowed(res.data)).catch(err=>{console.log(err)})
  }, [url, axiosSecure]);



  if(borrowed.length ===0){
    return <p className="text-center text-4xl absolute top-1/2 left-1/3 bg-zinc-100">You have not selected any book yet</p>
  }


 const deleteBookFromBorrowedPage = (id) =>{
  axios.delete(`https://library-server-gilt.vercel.app/deleteBookFromBorrowPage/${id}`,{
    method: "delete"
  })
  .then(res => {
    console.log(res.data)
    if(res.data.deletedCount >0){
      alert(`${id} has been deleted from this page`)
      const filteredData = borrowed.filter(d => d._id !==id);
      setBorrowed(filteredData)
    }
  })
 }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Book Name</th>
              <th>Author</th>
              
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {borrowed.map((data) => {
              return (
                <tr key={data._id}>
                  <th>
                    <button onClick={()=>deleteBookFromBorrowedPage(data._id)}><MdDelete  className="text-2xl text-red-600" /></button>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask  w-12 h-15 rounded-full">
                          <img src={data.BookImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data.BookName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data.AuthorName}
                  </td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowedBook;
