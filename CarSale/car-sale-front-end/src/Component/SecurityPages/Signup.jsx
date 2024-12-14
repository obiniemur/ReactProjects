import {useContext, useState} from "react";
import {dataContext} from "../Authprovider/ContextProvider";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const {signupUser} = useContext(dataContext);
  const [userError, setUserError] = useState("");
  const navigation = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_pass = form.confirm_password.value;

    if (password === confirm_pass) {
      signupUser(email, password)
        .then((userCredentials) => {
          console.log(userCredentials.user);
        })
        .catch((error) => setUserError(error.message));
    }else{
      Swal.fire(
        {
          icon: "error",
          title: 'Use Same Password for both field',
          text: "Something went wrong!",
        },
        navigation("/signup")
      );
    }

    if (userError) {
      Swal.fire(
        {
          icon: "error",
          title: userError,
          text: "Something went wrong!",
        },
        navigation("/signup")
      );
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSignup}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" name="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name="password" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="Confirm password" name="confirm_password" className="input input-bordered" required />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
