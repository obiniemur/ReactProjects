import { useContext, useState } from "react";
import { dataProvider } from "../Context/DataContext";
import Service from "./Service";

const Services = () => {
    const [showCard, setShowCard] = useState(6)
    const [ShowAllButoon, setShowAllButton]= useState (true)

    const {data} = useContext(dataProvider);
    const handleClick = ()=>{
        setShowCard(data.length);
        setShowAllButton(false)
    }

    return (
        <>
        <div className="text-center mt-5 px-4" >
           <h1 className="text-4xl font-fontType font-bold">Our Services</h1>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4 px-4">
            {data.slice(0, showCard).map(d=> <Service key={d.id} image={d.slider_images} category={d.category} detail={d.detail} id={d.id}/>)}
        </div>
        <div className="text-center mt-4">
        {ShowAllButoon && <button onClick={handleClick} className=" btn btn-neutral">Show All</button>}
        </div>
        </>
    );
};

export default Services;