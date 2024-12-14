import {useForm} from "react-hook-form";
import SectionTitles from "../../../components/SectionTitle/SectionTitles";
import {FaUtensils} from "react-icons/fa";
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
  const {register, handleSubmit, reset} = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    //Image upload to image DB and get an URL;
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
    if(res.data.success){
      //after saving the image to imgbb hosting, we are sending the whole form data to mongo db
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }

      const menuRes = await axiosSecure.post('/menu', menuItem);
      console.log(menuRes.data)
      if(menuRes.data.insertedId){
        reset();
        Swal.fire({
          position: "middle",
          icon: "success",
          title: `${data.name} has been saved`,
          showConfirmButton: false,
          timer: 1500
        });
      }



    }
    console.log('Response from image bb hosting',res.data)

  };
  return (
    <div>
      <SectionTitles heading="Add an Item" subHeading="What's New"></SectionTitles>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input {...register("name",{required:true})} type="text" placeholder="Recipe Name" className="input input-bordered w-full" />
          </div>

          <div className="flex gap-6">
            {/* Category  section of the form */}

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category Name*</span>
              </label>
              <select defaultValue="default" {...register("category",{required:true})} className="select select-bordered w-full">
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* Price section of the form */}

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input {...register("price",{required:true})} type="float" placeholder="Price" className="input input-bordered w-full " />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea {...register('recipe')}  className="textarea textarea-bordered h-60" placeholder="Recipe Details"></textarea>
          </div>

          <div className="form-control w-full my-6">
            <input {...register('image')} type="file" className="file-input w-full " />
          </div>

          <div className="text-center">
            <button className="btn w-full">
              Add Item <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
