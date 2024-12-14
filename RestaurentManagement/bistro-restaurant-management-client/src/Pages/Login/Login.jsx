import {useContext, useEffect, useState} from "react";
import {loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha} from "react-simple-captcha";
import {AuthContext} from "../../providers/AuthProviders";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Logged in",
        text: "You're logged in",
        icon: "success",
      });
      navigate(from, {replace: true});
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);

    if (validateCaptcha(user_captcha_value) == true) {
      alert("Captcha Matched");
      setDisabled(false);
    } else {
      alert("Captcha Does Not Match");
      setDisabled(true);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col md:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
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
                <LoadCanvasTemplate />
              </label>
              <input onBlur={handleValidateCaptcha} type="text" placeholder="Type The Captcha" name="captcha" className="input input-bordered" />
              <button className="btn btn-outline btn-xs mt-4">Validate</button>
            </div>

            <div className="form-control mt-6">
              {/* Apply the disable state here */}
              <input disabled={false} type="submit" className="btn btn-primary" value="Log In" />
            </div>
          </form>
          <div className="text-center p-4 font-extrabold">
            <p>
              <small>
                New Here?{" "}
                <Link className="text-red-400" to="/signup">
                  Create An Account
                </Link>
              </small>
            </p>
          </div>
          <SocialLogin className="mr-4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
