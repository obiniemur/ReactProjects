import SectionTitles from "../../../Components/SectionTitles";
import {useForm} from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Update = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const PetData = useLoaderData();
const navigate = useNavigate()

  console.log("call the user", user.email);

  const {
    register,
    handleSubmit,
    // formState: {errors},
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.image[0];
   

    const imageFile = {image: image};

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("from image host", res.data.success);
    if (res.data.success) {
      const name = data.name;
      const age = data.age;
      const category = data.category;
      const location = data.location;
      const short_desc = data.short_description;
      const long_desc = data.long_description;
      const adoption = false;
      const date = new Date().toJSON().slice(0, 10);
      const petImage = res.data.data.display_url;
      const user_email = user?.email;
      const petInformation = {name, age, category, location, short_desc, long_desc, adoption, petImage, date, user_email};

      axiosSecure.patch(`/updatePet/${PetData[0]._id}`, petInformation).then((res) => {
        
        if (res.data.modifiedCount>0) {
          reset();
          console.log("Obi", res.data);
          Swal.fire({
            title: "Horray",
            text: "Pet information is updated!",
            icon: "success",
          });
          navigate('/dashboard/mypets')
        }
      });
    }
  };
  return (
    <div className="my-4">
      <div className="hero min-h-fit ">
        <div className="card shrink-0 w-full max-w-lg  ">
          <SectionTitles title="Update Pet" />
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Pet Name" {...register("name", {required: true})} defaultValue={PetData[0].name} className="input input-bordered select-warning" />
            </div>

            <div className="md:flex justify-between gap-2">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input {...register("age", {required: true})} type="text" placeholder="Age" defaultValue={PetData[0].age} className="input input-bordered select-warning" required />
              </div>

              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input {...register("location", {required: true})} type="text" placeholder="Dog Location" defaultValue={PetData[0].location} className="input input-bordered select-warning" required />
              </div>
            </div>

            <select defaultValue={PetData[0].category} {...register("category", {required: true})} className="select select-warning  w-full max-w-lg">
              <option disabled value={PetData[0].category}>
                Pick a category
              </option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="bird">Birds</option>
              <option value="mammal">Small mammals</option>
              <option value="reptile">Reptiles</option>
              <option value="other">Other</option>
            </select>

            <textarea {...register("short_description", {required: true})} defaultValue={PetData[0].short_desc} placeholder="Short Description. EX: Food, game the pet like to play" className="textarea  select-warning textarea-sm w-full max-w-lg"></textarea>
            <textarea {...register("long_description", {required: true})} defaultValue={PetData[0].long_desc} placeholder="Write a brief description" className="textarea select-warning h-96 w-full max-w-lg"></textarea>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Your Pet Picture Here</span>
              </label>
              <input {...register("image", {required: true})} type="file" className="file-input file-input-bordered file-input-warning w-full " />
            </div>

            <div className="form-control mt-6">
              <input className="btn btn-warning" type="submit" value="Add to Database" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
