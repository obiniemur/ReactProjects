import {Helmet} from "react-helmet-async";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../providers/AuthProviders";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const {createUser, updateUserProfile} = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // save user entry in the database user collection
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("users added to the data");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Created Successfully",
                showConfirmButton: true,
                timer: 1500,
              });

              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Sign Up</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Name" {...register("name", {required: true})} name="name" className="input input-bordered" />
                {errors.name && <span className="text-red-600">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" placeholder="Photo URL" {...register("photoURL", {required: true})} className="input input-bordered" />
                {errors.name && <span className="text-red-600">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" {...register("email", {required: true})} name="email" className="input input-bordered" />
                {errors.email && <span className="text-red-600">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" {...register("password", {required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}/})} name="password" className="input input-bordered" required />
                {errors.password?.type === "required" && <p className="text-red-600">Password is require</p>}
                {errors.password?.type === "minLength" && <p className="text-red-600">Password must be minimum 6 character</p>}
                {errors.password?.type === "maxLength" && <p className="text-red-600">Password must be maximum 20 character</p>}
                {errors.password?.type === "pattern" && <p className="text-red-600">Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:</p>}
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Submit" />
              </div>
            </form>
            <div className="text-center p-4 font-extrabold">
              <p>
                <small className="px-4">
                  Already have an account?{" "}
                  <Link className="text-orange-400" to="/login">
                    Login Here
                  </Link>
                </small>
              </p>
            </div>
            <SocialLogin className="mr-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
