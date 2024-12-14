import { useContext } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../../AuthProvider/ContextProvider";

const Register = () => {

    const {signupUser} = useContext(dataContext);
//   const [userError, setUserError] = useState("");

    const handleRegister = (e) =>{
        e.preventDefault();
        const formData = e.target;
        // const name = formData.name.value;
        const email = formData.email.value;
        const password = formData.password.value;

       

        signupUser(email, password)
        .then((userCredentials) => {
            alert(`${userCredentials.user.email} Registration has been completed`)
          })
          .catch((error) => console.log(error));



    }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
          <h1 className="text-5xl font-bold">Register Here</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleRegister}>
          <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input type="text" name="name" placeholder="email" className="input input-bordered" required />
            </div>
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
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
             
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
        <p>Already has an account, go to login page <span className="text-2xl text-stone-500"><Link to='/login'>Click Here</Link></span> </p>

      </div>
    </div>
  );
};

export default Register;
