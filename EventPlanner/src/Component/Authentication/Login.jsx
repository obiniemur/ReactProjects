import { useContext, useState } from "react";
import { dataProvider } from "../Context/DataContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const navigation = useNavigate();
  const [signInError, setSignInError] = useState('');
  const location = useLocation();

  const {signInMethod, googlSign} = useContext(dataProvider);

  const handleLogin = (e) =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInMethod(email, password)
    .then(() =>{
      navigation(location?.state ? location.state : '/')

    }).catch((error) => setSignInError(error.message));
  }

  const googleLoginIn =()=>{
    googlSign()
    .then(()=>{
      navigation(location?.state ? location.state : '/')
    }).catch(error=>{console.log(error)})
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
          <h1 className="text-5xl font-bold">Login now!</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {signInError && <p className="bg-red-900 text-white font-fontType text-center">{signInError}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="border-dotted  w-fit text-4xl rounded-full ml-9 mb-4">
          <FcGoogle onClick={googleLoginIn}  />
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default Login;
