import Slider from "../Slider/Slider";
import Categories from "../Categories/Categories";
import { useState } from "react";

const Home = () => {
  const [formData, setData] = useState();

  const handleChange = (e) => {
    const { value } = e.target;
    setData(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData("");
  };
  // console.log(formData);
  return (
    <div>
      <Slider handleChange={handleChange} handleSubmit={handleSubmit} />
      <Categories formData={formData} />
    </div>
  );
};

export default Home;
