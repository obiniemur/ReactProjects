import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getAllStorageData } from '../../StorageManagement/LocalStorage';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
	const [totalDonated, settotalDonated] = useState();
	const [AllDoation, setAlldonation] = useState();
	const getAllDonationlist = useLoaderData();

	useEffect(() => {
		let allTotal = 0;
		getAllDonationlist.map((e) => {
			allTotal = allTotal + e.price;
		});
		setAlldonation(allTotal);
	}, []);

	console.log('overall', AllDoation);

	useEffect(() => {
		const gettingDataFromStorage = getAllStorageData();
		const datas = getAllDonationlist.filter((d) => gettingDataFromStorage.includes(d.id));
		let totalIDonated = 0;
		for (const value of datas) {
			console.log('value', value.price);
			totalIDonated = totalIDonated + value.price;
		}
		settotalDonated(totalIDonated);
	}, []);

	const data = {
		labels: ['I donated', 'Total Donation'],
		datasets: [
			{
				label: 'Donation',
				data: [totalDonated, AllDoation],
				backgroundColor: ['rgba(0, 196, 159, 1)', 'rgba(255, 0, 0, 1)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="max-w-[500px] mx-auto mt-10">
			<Pie data={data} />
		</div>
	);
};

export default Statistics;
