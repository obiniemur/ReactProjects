import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Category = (props) => {
  const { image, category, category_bg, card_bg, title, id } = props;

  return (
    <Link to={`/details/${id}`}>
      <div
        style={{ backgroundColor: card_bg }}
        className="card card-compact w-40 lg:w-96 md:w-96 bg-base-100 shadow-xl p-4 h-[250px] lg:h-[300px] md:h-[300px] mx-auto">
        <figure>
          <img className="lg:h-[200px] md:h-[200px] h-[110px] w-[300px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <button
            style={{ backgroundColor: category_bg, color: card_bg }}
            className="card-title w-fit px-2 py-1 text-sm font-light opacity-[4.5]">
            {category}
          </button>
          <p
            style={{ color: category_bg }}
            className="lg:text-lg md:text-lg text-sm font-semibold lg:whitespace-nowrap">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Category;

Category.propTypes = {
  image: PropTypes.string,
  category: PropTypes.string,
  category_bg: PropTypes.string,
  card_bg: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number,
  formData: PropTypes.string,
};
