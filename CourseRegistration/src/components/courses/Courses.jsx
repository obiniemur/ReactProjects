import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import Course from "../Course/Course";

const Courses = ({ studentCourseList }) => {
  const [courses, setCourses] = useState([]);
  // console.log(courses)

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-center justify-self-center">
      {courses.map((data,id) => (
        <Course
          key={id}
          img={data.image_url}
          title={data.title}
          details={data.details}
          price={data.price}
          duration={data.duration}
          studentCourseList={studentCourseList}
        />
      ))}
    </div>
  );
};

export default Courses;

Courses.propTypes = {
  studentCourseList: PropTypes.func
};

