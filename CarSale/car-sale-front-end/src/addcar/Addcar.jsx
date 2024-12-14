import Swal from "sweetalert2";
import 'animate.css';

const Addcar = () => {


    const handleAddCarFormSubmit = (event) =>{
        event.preventDefault();

        const form = event.target;
        let img = form.image.value;
        const name = form.name.value;
        const brand_Name = form.brand_Name.value;
        const convert_Brand = brand_Name.toLowerCase()
        const type = form.type.value;
        const convert_Type = type.toLowerCase();
        const price = form.price.value;
        const details = form.details.value;
        const slider_image1 = form.slider_image1.value;

  
        const  brand = {convert_Brand, slider_image1};
        const products = {img, name, convert_Type, price, details, brand};

        fetch('https://obi-car-shop-backend.vercel.app/addcar',{
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(products)
        })
        .then(res => res.json())
        .then(data=> {

          if(data.insertedId){

            Swal.fire({
              title: 'The product is added to mongodb',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })

          }
          else{

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
            })

          }

        })

    


    }




  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content w-full">
        <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleAddCarFormSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input type="text" name="image" placeholder="Place the Image URL" className="input input-bordered"  />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input type="text" name="name" placeholder="Product Name" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Brand Name</span>
              </label>
              <input type="text" name="brand_Name" placeholder="Brand Name" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <input type="text" name="type" placeholder="Ex: Car or Bike" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input type="text" name="price" placeholder="Price" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Details</span>
              </label>
              {/* <input type="text" name="details" placeholder="Type here" className="input input-bordered input-lg w-full max-w-xs" /> */}
              <textarea placeholder="Products Details" name="details" className="textarea textarea-bordered textarea-lg w-full"></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Slider Image (optional)</span>
              </label>
              <input type="text" name="slider_image1" placeholder="Place the Image URL" className="input input-bordered" />
            </div>

            

            

            <div className="form-control mt-6">
              <button className="btn btn-primary">Add This Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcar;
