import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import SectionTitles from "../../Components/SectionTitles";
import { FaEdit } from "react-icons/fa";

const MyCampaign = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {data: myCamp = []} = useQuery({
    queryKey: ["MyCamp", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myCamps?email=${user.email}`);
      return res.data;
    },
  });

  console.log(myCamp);
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
            <th>Pet Name</th>
            <th>Donation Amount</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
         {
            myCamp.map(item=> <tr key={item._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.petImage} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      
                    </div>
                  </div>
                </td>
                <td>
                  ${item.amount}
                  
                </td>
                <td><FaEdit /></td>
                
              </tr>)
         }
          
          
          
        </tbody>
       
      </table>
    </div>
  );
};

export default MyCampaign;
