import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import petimg from "../assets/Images/Other/pethouse.jpg";

import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import {useForm} from "react-hook-form";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Signup = () => {
  const {signUp, logOut, addPhotoAndNametoFirebaseafterSignup} = useAuth();
  const [err, setErr] = useState('')
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = {image: data?.image[0]};
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const name = data.name;
      const email = data.email;
      const password = data.password;
      const image = res.data.data.display_url;
      const userInfo = {name, email, image};

      signUp(email, password).then((user) => {
        if (user) {
          addPhotoAndNametoFirebaseafterSignup(name, image)
            .then(() => {
              console.log('from client',userInfo)
              axiosPublic.post("/users", userInfo).then((res) => console.log(res.data));

              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration completed. Please log in now",
                showConfirmButton: true,
                timer: 5000,
              });
              logOut().then(() => console.log("logout and moving to login page"));
              navigate("/login");
            })
            .catch((err) => {
              setErr(err)
              console.log('test',err);
            });
        }
      });
    }
  };

  return (
    <div className="my-20 mx-4">
      <div className="hero min-h-fit ">
        <div className="hero-content flex-col lg:flex-row justify-around bg-slate-100 shadow-2xl">
          <div className="md:w-1/2">
            <img src={petimg} alt="pethouse" className="mix-blend-multiply" />
          </div>
          <div className="card md:w-1/3">
            <p className="text-center font-Dancing font-bold text-2xl">Register Here</p>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" {...register("name", {required: true})} className="input input-bordered" />
                {errors.name && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" {...register("email", {required: true})} className="input input-bordered" required />
                {errors.email && <span className="text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" {...register("password", {required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}/})} className="input input-bordered" required />
                {errors.password?.type === "required" && <p className="text-red-600">Password is require</p>}
                {errors.password?.type === "minLength" && <p className="text-red-600">Password must be minimum 6 character</p>}
                {errors.password?.type === "maxLength" && <p className="text-red-600">Password must be maximum 20 character</p>}
                {errors.password?.type === "pattern" && <p className="text-red-600">Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload Your profile Pic</span>
                </label>
                <input type="file" {...register("image")} className="file-input file-input-bordered file-input-warning w-full " />
                {errors.image && <span className="text-red-600">This field is required</span>}
              </div>

              <div className="form-control mt-6">
                <input type="submit" value="Sign Up" className="btn btn-warning" />
              </div>
            </form>
            {err && <p>{err}</p>}
           
            <p className="text-center">
              Already have an account? Click{" "}
              <Link to="/login">
                <span className="text-red-900">Here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
