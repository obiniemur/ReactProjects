const getAllStorageData = () => {
	const getData = localStorage.getItem('Donation');
	if (getData) {
		return JSON.parse(getData);
	}
	return [];
};

const saveDonatedData = (id) => {
	const storedData = getAllStorageData();
	const exist = storedData.find((donateId) => donateId === id);
	if (!exist) {
		storedData.push(id);
		localStorage.setItem('Donation', JSON.stringify(storedData));
	}
};

export { getAllStorageData, saveDonatedData };
