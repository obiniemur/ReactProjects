import { Link } from 'react-router-dom';
import bookPlaceHolder from '../../../assets/bookplace.png'
const CategoryCard = (props) => {
  const { image, category} = props;


  return (
 
      <>
        <figure>
          {image ? <img className="h-40 w-60" src={image} alt="car!" /> : <img className="h-40 w-60" src={bookPlaceHolder} alt='Book PlaceHolder' />}
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl font-extrabold uppercase justify-center md:justify-normal">{category}</h2>

          <div className="card-actions justify-center md:justify-end">
            <Link to={`/books/${category}`}><button className="btn btn-primary">Showw All</button></Link>
          </div>
        </div>
 </>
   
  );
};

export default CategoryCard;
