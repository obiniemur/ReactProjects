import { useState } from "react";
import "./App.css";
import Courses from "./components/courses/courses";
import Sidebarcomponent from "./components/SidebarComponent/Sidebarcomponent";

function App() {
  const [courseList, setCourseList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  const studentCourseList = (test1) => {
    const newData = [...courseList, test1];
    totalDuration(newData);
    findTheSum(newData);
  };

  //Total Price
  const findTheSum = (number) => {
    let totalPrice = 0;
    for (let i = 0; i < number.length; i++) {
      totalPrice += number[i].price;
    }
    const Sum_price = parseFloat(totalPrice.toFixed(2));
    setTotalPrice(Sum_price);
  };

  //Total Duration
  const totalDuration = (number) => {
    let totalDuration = 0;
    for (let i = 0; i < number.length; i++) {
      totalDuration = totalDuration + number[i].duration;
    }
    if (totalDuration <= 20) {
      setCourseList(number);
      setTotalLength(totalDuration)
    } else {
      console.log("nothing");
    }
  };

  return (
    <div className="max-w-full lg:max-w-[100rem] md:max-w-7xl mx-auto lg:flex justify-around">
      <div>
        <h1 className="text-lg text-center">Course Registration</h1>
        <Courses studentCourseList={studentCourseList} />
      </div>
      <div>
        <Sidebarcomponent
          courseList={courseList}
          totalPrice={totalPrice}
          totalLength={totalLength}
        />
      </div>
    </div>
  );
}

export default App;
