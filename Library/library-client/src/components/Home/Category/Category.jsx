import {useEffect, useState} from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState(8);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios
      .get("https://library-server-gilt.vercel.app/findCategory")
      .then((data) => setCategory(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl text-center">Our Category</h1>

      <div className="card w-80 mx-auto md:w-fit h-fit glass mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-4 ">
          {category.slice(0, total).map((cat) => (
            <CategoryCard key={cat._id} id={cat._id} image={cat.image} category={cat.lowerCaseCategory} />
          ))}
        </div>
        {show && (
          <p
            onClick={() => {
              setTotal(category.length), setShow(false);
            }}
            className="text-center text-lg text-neutral font-bold hover:bg-stone-300 my-4 p-1 w-40 mx-auto rounded-xl">
            Show More
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
