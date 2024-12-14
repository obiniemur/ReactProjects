import {Link, useLoaderData,} from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

import {useForm} from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PetDetail = () => {
  const data = useLoaderData();
  const {user} = useAuth();
  // const navigate = useNavigate()
  // console.log(user);
  console.log( 'outside',data);
  const axiosSecure = useAxiosSecure();


  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  console.log("test",errors)

  const onSubmit =  (formData) => {
    const adopter_name = user.displayName;
    const adopter_email = user.email;
    const phone = formData.phone;
    const address = formData.address;
    const petInfo = data[0]._id;

    const adopter_information = {adopter_name, adopter_email, phone, address, petInfo};
    console.log(petInfo)
    
    axiosSecure.post('/adopter_information',adopter_information)
    .then(res=>{
      if(res.data.insertedId){

        axiosSecure.put(`/pet/adoption/${petInfo}`)
        .then(res=>{
          if(res.data.modifiedCount>0){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for the Adoption",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        
      }
    })

  };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      {data.map((pet) => {
        return (
          <div key={pet._id}>
            <div>
              <img className="w-full" src={pet.petImage} alt="Pet Image" />
            </div>

            <div className="flex flex-col md:flex-row my-4 justify-between font-Roboto">
              <div className="md:w-1/2">
                <h1 className="text-2xl mb-2">Little details about me: {pet.name}</h1>
                <p className="text-justify">{pet.long_desc}</p>
              </div>

              <div className="md:w-1/3  bg-red-50 p-4 mt-10 md:mt-0 space-y-6 font-Roboto">
                <h1 className="text-2xl text-center">Pet Details</h1>
                <p>Post Date: {pet.date}</p>
                <p>Location: {pet.location}</p>
                <p>Age: {pet.age}</p>
                {!pet.adoption && <p>This pet is ready to be adopted</p>}
               {
                user ?  <button onClick={() => document.getElementById("my_modal_5").showModal()} className="btn btn-warning w-full ">
                Adopt
              </button> : <Link to='/login'><button className="btn btn-warning w-full mt-2">Login Please</button></Link>
               }
              </div>
            </div>
            {/* Show Model here */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <p className="text-center font-Roboto text-xl font-bold">Pet Information</p>

                <div className="font-Dancing font-extrabold flex justify-evenly">
                  <p>Pet name is: {pet.name}</p>
                  <p>Category: {pet.category}</p>
                  <p>Age: {pet.age}</p>
                </div>

                <h3 className="font-bold text-lg text-center">Please fill up this form</h3>

                {/* Form start here */}
                <div className="card  w-full max-w-md shadow-2xl bg-yellow-400">
                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input type="text" name="name" defaultValue={user?.displayName} disabled className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="email" defaultValue={user?.email} name="email" disabled className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone</span>
                      </label>
                      <input type="text" name="phone" {...register("phone",{required:true})} placeholder="(333)-111-4444" className="input input-bordered"  />
                      {errors.phone?.type === "required" && <p className="text-red-500" role="alert">phone  is required</p>}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Address</span>
                      </label>
                      <input type="text" name="address" {...register("address", {required: true})} placeholder="Your Address" className="input input-bordered" />
                      {errors.address?.type === "required" && <p className="text-red-500" role="alert">Address  is required</p>}
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
            
            
            {/* End model here */}
            {/* <PetAdoption pet={pet} adopterName = {} /> */}
          </div>
        );
      })}
    </div>
  );
};

export default PetDetail;
