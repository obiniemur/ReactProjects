import {useContext, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {dataProvider} from "../Context/DataContext";

const Registration = () => {
  const {signUpMethod} = useContext(dataProvider);
  const [signUpError, setSignUpError] = useState('');
  
  const navigation = useNavigate();

  const handleSighup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const Confirmpassword = e.target.Confirmpassword.value;



    

    if(password === Confirmpassword){

      signUpMethod(email, password)
      .then((R) => {
        console.log(R.user);
        navigation('/login')
      })
      .catch((error) => setSignUpError(error.message));
  } else{
    setSignUpError("Password Doesn't Match")
  }

}

    

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSighup}>
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
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="password" name="Confirmpassword" className="input input-bordered" required />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            {signUpError && <p className="bg-red-900 text-white font-fontType text-center">{signUpError}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <p>
              Already have an account? Click here to <NavLink to="/login">Login</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
