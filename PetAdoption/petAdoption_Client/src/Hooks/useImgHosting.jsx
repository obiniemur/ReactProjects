import {useEffect} from "react";
import useAxiosSecure from "./useAxiosSecure";

const useImgHosting = ({image}) => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_API;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const axiosSecure = useAxiosSecure();

  const messagefrom_img = {};

  useEffect(() => {
    sendImg();
  }, []);

  const sendImg = async () => {
    const res = await axiosSecure.post(image_hosting_api, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    messagefrom_img(res.data);

    return messagefrom_img;
  };

  return messagefrom_img;
};

export default useImgHosting;
