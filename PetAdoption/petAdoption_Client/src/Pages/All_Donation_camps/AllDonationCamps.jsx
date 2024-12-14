import {useQuery} from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";

const AllDonationCamps = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {
    register,
    
    handleSubmit,
  } = useForm();

  const {data: allCompaign = []} = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allCamps");
      return res.data;
    },
  });
  


  const onSubmit = (data) => {
    console.log(data)
   
    const donator_name = user.displayName;
    const donator_email = user.email;
    const petInfo = data.petID;
    const amount = data.amount;

    const donator = {donator_name, donator_email,  amount, petInfo};
    console.log(donator);

    axiosSecure.post("/donator", donator).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for the Adoption",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      {allCompaign.map((item) => {
        return (
          <div key={item._id} className="card bg-yellow-400 w-full md:w-3/4 my-4 text-center">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="">
                <img className="h-80 w-80 mx-auto" src={item.petImage} alt="" />
              </div>

              <div className="space-y-4 pr-4 font-Poppins">
                <p>Name: {item.name}</p>
                <p>Age: {item.age}</p>
                <p>Category: {item.category}</p>
                <p>Last Date: {item.lastDate}</p>
                <p>Donate: {item.amount}</p>
                <button onClick={() => document.getElementById("my_modal_5").showModal()} className="btn btn-warning w-full text-white">
                  Donate
                </button>
              </div>
            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <p className="text-center font-Roboto text-xl font-bold">Pet Information</p>

                <div className="font-Dancing font-extrabold flex justify-evenly">
                  <p>Pet name is: {item.name}</p>
                  <p>Category: {item.category}</p>
                  <p>Age: {item.age}</p>
                </div>

                <h3 className="font-bold text-lg text-center">Please fill up this form</h3>

                {/* Form start here */}
                <div className="card  w-full max-w-md shadow-2xl bg-yellow-400">
                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input type="text" name="name" defaultValue={user?.displayName} disabled className="input input-bordered" />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="email" defaultValue={user?.email} name="email" disabled className="input input-bordered" />
                    </div>

            
                    <div className="form-control ">
                      <label className="label">
                        <span className="label-text">Amount</span>
                      </label>
                      {/* <input {...register("age", {required: true})} type="text" placeholder="Age" className="input input-bordered select-warning" required /> */}
                      <input {...register("amount", {required: true})} type="range" min={25} max="100"  className="range range-warning" step="25" />
                      <div className="w-full flex justify-between text-xs px-2">
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Pet ID</span>
                      </label>
                      <input {...register("petID")} type="text" defaultValue={item._id}    className="input input-bordered" />
                    </div>

                    <div className="form-control mt-6">
                      <input type="submit" className="btn btn-warning font-Roboto text-xl" value="Confirm" />
                    </div>
                  </form>
                </div>
                {/* Form Ends Here */}

                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-warning">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        );
      })}
    </div>
  );
};

export default AllDonationCamps;
