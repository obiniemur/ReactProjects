import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitles from "../../Components/SectionTitles";

import { FaBan, } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";


const Users = () => {
    const axiosSecure = useAxiosSecure()
    const {data:users=[], refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/Allusers')
            return res.data
        }
    })

    const [isAdmin] = useAdmin();
    console.log(isAdmin)


    const makeAdmin = (item)=>{
        
        axiosSecure.patch(`/makeAdmin/${item._id}`)
        refetch()
        .then(res=>{
            if(res.data.modifiedCount>0){
                Swal.fire({
                    title: "Success Message",
                    text: `${item.name} is now an admin`,
                    icon: "success"
                  });
            }
        })
    }


    console.log(users)
    return (
        <div className="overflow-x-auto">
        <SectionTitles title="My Campaign" />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                #
              </label>
            </th>
            <th>User Name</th>
            <th>Role (click to make admin)</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
         {
            users.map(item=> <tr key={item._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <span>{item.email}</span>
                      
                    </div>
                  </div>
                </td>
                <td>
                 <button onClick={()=>makeAdmin(item)} className="btn btn-warning text-white hover:bg-slate-500">{item.role === "admin" ? "Admin" : "User"}</button>
                  
                </td>
                <td><FaBan /></td>
                
              </tr>)
         }
          
          
          
        </tbody>
       
      </table>
    </div>
    );
};

export default Users;