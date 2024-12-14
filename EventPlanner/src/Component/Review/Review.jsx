import {useContext, useEffect} from "react";
import {useState} from "react";
import {useRef} from "react";
import "./Review.css";
import {dataProvider} from "../Context/DataContext";

const Review = () => {
  const {reviews} = useContext(dataProvider);

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 2500;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => setIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1)), delay);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{transform: `translate3d(${-index * 100}%, 0, 0)`}}>
        {reviews.map((img, index) => (
          <div className="slide" key={index}>
            <img className="w-[300px]" src={img.image} alt="" />

            <div>
              <div className="flex justify-between">
                <p>Name: {img.user}</p>
                <p>{img.rating}</p>
               
              </div>

              <h1 className="whitespace-normal text-justify w-[300px] font-fontType">{img.comment}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {reviews.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}></div>
        ))}
      </div>
    </div>
  );
};
export default Review;
