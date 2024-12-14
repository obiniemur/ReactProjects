import PropTypes from 'prop-types';
const Slider = ({ handleChange, handleSubmit }) => {
	return (
		<div id="sliderSection" className="relative  mb-7">
			<div className="relative">
				<img className="w-full" src="https://i.ibb.co/W3ZzMr6/slider.png" alt="Slider Image" />

				<img
					className="absolute w-full bottom-0 z-10"
					src="https://i.ibb.co/X31YkZ3/Rectangle-4282.png"
					alt="overlay"
				/>
			</div>

			<div
				id="search"
				className="absolute  z-20  border-gray-900 right-[10px] lg:right-[27%] md:right-[27%] top-[50%] px-3 lg:px-0">
				<h1 className="text-xl lg:text-5xl font-bold bg-slate-100">I Grow By Helping People In Need</h1>
				<div className="lg:max-w-[470px] mx-auto mt-2 ">
					<form>
						<input
							type="text"
							className="mt-1  lg:w-[379px] lg:h-[50px] rounded-l-lg border-2 border-[#DEDEDE] shadow-sm  relative"
							placeholder=""
							onChange={handleChange}
						/>
						<button
							onClick={() => handleSubmit}
							className=" text-[#fff] bg-[#FF444A] absolute w-[100px] mx-auto top-[40px] lg:top-[59px] h-[28px] lg:h-[52px] rounded-r-lg">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Slider;

Slider.propTypes = {
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
};
