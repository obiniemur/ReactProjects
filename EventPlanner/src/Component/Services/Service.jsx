import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Service = (props) => {
    const{id, image, category, detail} = props;
    const shortDetail = detail.slice(0,90)
  return (
    <div className="card w-90 bg-base-100 shadow-xl image-full" data-aos="fade-left">
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title ">{category} Events</h2>
        <p>{shortDetail}....</p>
        <div className="card-actions justify-end">
          <Link to={`/services/${id}`}><button className="btn btn-neutral">See Detail</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Service;

Service.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  detail: PropTypes.string,
};

