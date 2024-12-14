import { useContext } from "react";
import { dataProvider } from "../Context/DataContext";
import Review from "./Review";

const Reviews = () => {
    const {reviews} = useContext(dataProvider);
    console.log(reviews)
    return (
        <div className="max-w-5xl mx-auto">

            {reviews.map(r=> <Review key={r.id} />)}
            
        </div>
    );
};

export default Reviews;