import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import axios from "axios";

const Services = () => {
    const [services, setServices] = useState([]);

const url = 'http://localhost:5000/services';

    useEffect(()=>{
        axios.get(url, {withCredentials:true})
        .then(res=>{
            setServices(res.data)
        })
    },[url])
    console.log(services)

    return (
        <div className="mt-4">
            <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
            <h2 className="text-5xl">Our Services Area</h2>
            <p>the majority have suffered alteration in some form, by injected humour, or randomised<br></br>words which dont look even slightly believable. </p>
            
            <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => <ServiceCard key={service._id} service={service}  />)}
            </div>
        </div>
        </div>
    );
};

export default Services;