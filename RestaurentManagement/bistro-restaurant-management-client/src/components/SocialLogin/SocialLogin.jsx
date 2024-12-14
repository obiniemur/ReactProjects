import {FaGoogle} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import {useNavigate} from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const {googleSignIn} = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const HandleGoogleSignin = () => {
    googleSignIn().then((result) => {
    //   console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      axiosPublic.post('/users', userInfo)
      .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
            Swal.fire({
                title: "Logged in",
                text: "You're logged in",
                icon: "success",
              });
        }
      })
      navigate("/");
    });
  };

  return (
    <div className="p-8">
      <div className="divider"></div>
      <div>
        <button onClick={HandleGoogleSignin} className="btn">
          <FaGoogle />
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
