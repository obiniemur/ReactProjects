import { useLoaderData, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveDonatedData } from '../../StorageManagement/LocalStorage';

const Details = () => {
	const data = useLoaderData();
	const { id } = useParams();
	const convertID = parseInt(id);
	const jobs = data.find((job) => job.id === convertID);

	const handleDonationSubmit = () => {
		saveDonatedData(convertID);
		toast('Thank you for the donation', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	return (
		<div className="max-w-[1320px] mx-auto mt-32">
			<div className="relative">
				<img className="w-full h-[450px] lg:h-[600px] mb-5" src={jobs.picture} alt="" />
				<div className="absolute inset-x-0 bottom-0 bg-black opacity-80 h-14"></div>
				<button
					onClick={handleDonationSubmit}
					style={{ backgroundColor: jobs.category_bg }}
					className="text-[#fff] text-lg font-bold absolute bottom-2 ml-7 p-1">
					Donate {jobs.price}
				</button>
				<ToastContainer />
			</div>

			<div>
				<h1 className="text-3xl lg:text-5xl  font-bold mb-4 ml-4 lg:ml-0">{jobs.title}</h1>
				<p className="text-justify text-sm leading-7 px-4 lg:px-0 text-[#545454]">{jobs.description}</p>
			</div>
		</div>
	);
};

export default Details;
