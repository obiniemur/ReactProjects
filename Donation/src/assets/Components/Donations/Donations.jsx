import { useLoaderData } from 'react-router-dom';
import { getAllStorageData } from '../../StorageManagement/LocalStorage';
import { useEffect, useState } from 'react';
import Donated from '../Donated/Donated';

const Donations = () => {
	const alreadyDonated = useLoaderData();

	const [donated, setDonated] = useState([]);
	const [dataLength, setDataLength] = useState(4);
	const [showAllItem, setShowAllItem] = useState(false);

	useEffect(() => {
		const storageId = getAllStorageData();
		const findingStorageData = alreadyDonated.filter((data) => storageId.includes(data.id));
		setDonated(findingStorageData);
	}, [alreadyDonated]);

	return (
		<div className="max-w-[1320px] mx-auto mt-32 grid   lg:grid-cols-2 gap-4 ">
			{donated.slice(0, dataLength).map((e) => (
				<Donated
					key={e.id}
					img={e.picture}
					category={e.category}
					category_bg={e.category_bg}
					card_bg={e.card_bg}
					title={e.title}
					id={e.id}
					price={e.price}
				/>
			))}
			<div
				onClick={() => {
					setShowAllItem((e) => !e);
					showAllItem ? setDataLength(4) : setDataLength(donated.length);
				}}
				className="w-[110px] h-[48px] bg-[#009444] rounded-md p-3 mx-auto text-[#fff] text-center mb-4 cursor-pointer">
				{showAllItem ? 'Show Less' : 'Show All'}
			</div>
		</div>
	);
};

export default Donations;
