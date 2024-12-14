import {useContext} from "react";
import {Link} from "react-router-dom";
import {dataContext} from "../../AuthProvider/ContextProvider";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";

const Login = () => {
  const {signinUser,signinWithGoogle} = useContext(dataContext);
  //   const [userError, setUserError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


const handleGoogleLogin = () =>{
  signinWithGoogle()
  .then((result)=>{

    const test = result.user.email
    const user = {test}
    axios.post('https://library-server-gilt.vercel.app/jwt', user, {withCredentials:true})
    .then(res=>{
      if(res.data.success){
        navigate(location?.state ? location?.state : "/");
      }
    })
  })

}


  const handleLogin = (e) => {
    e.preventDefault();
    const formData = e.target;
    const email = formData.email.value;
    const password = formData.password.value;
    signinUser(email, password)
      .then((userCredentials) => {
        alert(`${userCredentials.user.email} User is logged in`);
        const user = {email};
        
        axios.post("https://library-server-gilt.vercel.app/jwt", user, {withCredentials: true}).then((res) => {
          if (res.data.success) {
            navigate(location?.state ? location?.state : "/");
          }
        });
      })
      .catch((error) => console.log(error));
  };

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
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center">
            <button className="p-4 text-4xl text-center" onClick={handleGoogleLogin}>
              <FcGoogle />
            </button>
          </div>
        </div>
        <p>
          Do not have any account, please register here{" "}
          <span className="text-2xl text-stone-500">
            <Link to="/register">Click Here</Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
