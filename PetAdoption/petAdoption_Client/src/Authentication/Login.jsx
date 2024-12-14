import { Link, useNavigate } from "react-router-dom";
import petimg from "../assets/Images/Other/pethouse.jpg";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useFormik } from "formik";
const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // const name = values.name
      const email = values.email;
      const password = values.password;

      logIn(email, password).then((user) => {
        console.log("why man", user);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Welcome ${user.user.email} to our PUPHUB`,
          showConfirmButton: false,
          timer: 5000,
        });
        navigate("/");
      });
    },
  });

  return (
    <div className="my-20 mx-4">
      <div className="hero min-h-fit ">
        <div className="hero-content flex-col lg:flex-row justify-around bg-slate-100 shadow-2xl">
          <div className="md:w-1/2">
            <img src={petimg} alt="pethouse" className="mix-blend-multiply" />
          </div>
          <div className="card md:w-1/3">
            <p className="text-center font-Dancing font-bold text-2xl">
              Please Login Here
            </p>
            <form className="card-body" onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  value={formik.value?.email}
                  onChange={formik.handleChange}
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  value={formik.value?.email}
                  onChange={formik.handleChange}
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-warning"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center">
              New User?{" "}
              <Link to="/signup">
                Register <span className="text-red-900">Here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
