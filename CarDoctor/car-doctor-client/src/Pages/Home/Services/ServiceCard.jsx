import { WiDirectionRight } from 'react-icons/wi';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {_id,title, img, price} = service;
   
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img  src={img} alt="img" className="rounded-xl h-[208px] w-[314px]" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions text-[red]">
        <p className="text-left">Price: ${price}</p>
          <Link to={`/book/${_id}`}>

          <WiDirectionRight className='text-3xl' />
          
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
