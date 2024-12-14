import {useEffect, useState} from "react";

const ChefRecommend = () => {
  const [reommend, setRecommend] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setRecommend(data));
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between">
      {reommend.slice(0,3).map((item) => {
        return (
          <div className="card w-96  bg-[#F3F3F3] shadow-xl" key={item._id}>
            <figure >
              <img src={item.image} alt="Food" className="rounded-xl w-screen" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold">{item.name}</h2>
              <p className="text-center">{item.recipe}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChefRecommend;
