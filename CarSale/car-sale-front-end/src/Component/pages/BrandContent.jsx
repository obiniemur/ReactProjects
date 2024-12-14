import { Link } from "react-router-dom";

const BrandContent = (props) => {
    const {img, name, id, brand_name, details} = props;
  return (
    <div className="card w-full lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img className="md:w-[300px] h-[250px] md:h-[300px]" src={img} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name:{name}</h2>
        {/* <p>{details}</p> */}
        <div className="card-actions md:absolute bottom-0 right-0">
          <Link to={`details/${id}`}><button className="btn btn-primary">See Details</button></Link>
        </div>
      </div>
    </div>
  );
};

export default BrandContent;
