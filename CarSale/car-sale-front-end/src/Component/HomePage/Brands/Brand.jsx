import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Brand = (props) => {
    const {brandname, img}= props;
    


  return (
    <div className="card bg-base-100 shadow-xl image-full">
      <figure>
        <img  src={img} alt="car" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{brandname.toUpperCase()}</h2>
        <div className="card-actions justify-end">
          <Link  to={`/brandpage/${brandname}`}><button className="btn btn-primary absolute bottom-0 right-0">Check More</button></Link>
        </div>
      </div>
    </div> 
  );
};

export default Brand;
