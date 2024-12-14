import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Donated = (props) => {
	const { img, category, category_bg, card_bg, title, id, price } = props;
	return (
		<div className="flex">
			<div>
				<img className="w-[150px] h-[160px] rounded-md" src={img} alt="" />
			</div>
			<div style={{ backgroundColor: card_bg }} className="w-full lg:w-[500px] p-4">
				<p
					style={{ backgroundColor: category_bg, color: card_bg }}
					className="w-fit opacity-60 font-extrabold text-sm  px-2">
					{category}
				</p>
				<h1 className="lg:text-2xl md:text-2xl text-base font-semibold text-[#0B0B0B] lg:whitespace-nowrap">
					{title}
				</h1>
				<p style={{ color: category_bg }} className="text-base font-semibold">
					$ {price}
				</p>

				<Link to={`/details/${id}`}>
					<button style={{ backgroundColor: category_bg }} className="lg:p-3 md:p-3 p-1 text-[#fff]">
						View Details
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Donated;

Donated.propTypes = {
	img: PropTypes.string,
	category: PropTypes.string,
	category_bg: PropTypes.string,
	card_bg: PropTypes.string,
	title: PropTypes.string,
	id: PropTypes.number,
	price: PropTypes.string,
};
