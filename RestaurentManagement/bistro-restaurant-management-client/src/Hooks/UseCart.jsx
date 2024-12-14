import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const UseCart = () => {
  // const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {refetch, data: cart = []} = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });
  return [cart, refetch];
};

export default UseCart;
