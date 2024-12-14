import {useContext, useState} from "react";
import {dataContext} from "../Authprovider/ContextProvider";
import {useNavigate, useLocation} from "react-router-dom";
import Swal from "sweetalert2";

const Signin = () => {
  const {signinUser} = useContext(dataContext);
  const [userError, setUserError] = useState("");

  const navigation = useNavigate();
  const location = useLocation();

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signinUser(email, password)
      .then(() => {
        navigation(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setUserError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSignIn}>
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

            <div>
              {userError &&
                Swal.fire({
                  icon: "error",
                  title: userError,
                  text: "Something went wrong!"
                },navigation('/signin'))}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
