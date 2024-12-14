import PropTypes from "prop-types";
import { BiDollar } from "react-icons/bi";
import { BsBook } from "react-icons/bs";

const Course = (props) => {
  const {
  title,
  img,
  details,
  price,
  duration,
  studentCourseList,
} = props

  return (
    <div className="bg-slate-100 md:w-96 py-2 px-2">
      <img className="w-60 mx-auto" src={img} alt="" />
      
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-justify text-sm text-[#7F7E7E]">{details}</p>
        <div className="flex justify-between">
          <div className="flex items-center">
            <BiDollar />
            <p>{price}</p>
          </div>
          <div className="flex items-center justify-between">
            <BsBook />
            <p className="ml-2">{duration} Hours</p>
          </div>
        </div>
        <button
          onClick={() => studentCourseList(props)}
          className="rounded-none bg-[#2F80ED] w-full text-white mt-4"
        >
          Select
        </button>
      
    </div>
  );
};

Course.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  details: PropTypes.string,
  price: PropTypes.number,
  duration: PropTypes.number,
  studentCourseList:PropTypes.func
};

export default Course;


