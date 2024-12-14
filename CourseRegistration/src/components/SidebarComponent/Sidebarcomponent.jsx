import PropTypes from "prop-types";
import { useState } from "react";
const Sidebarcomponent = ({ courseList, totalPrice, totalLength }) => {

const[Hours] = useState(20);

  const dataSide = courseList.map((data, idx) => {
    return (
      <div key={idx}>
        <div className="flex justify-between">
          <h3 className="mx-2">{data.title}</h3>
          <p>{data.price}</p>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h3>Total Hours Remaining: {Hours - totalLength}</h3>
      <h1 className="text-lg font-bold mb-6">Course Names:</h1>
      {dataSide}
      <hr />
      <div>
        <h1>Total Hours: {totalLength}</h1>
        <hr />
        <h1>Total Price: {totalPrice}</h1>
      </div>
    </div>
  );
};

export default Sidebarcomponent;

Sidebarcomponent.propTypes = {
  courseList: PropTypes.array,
  totalPrice: PropTypes.number,
  totalLength:PropTypes.number
};

