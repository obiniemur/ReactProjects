import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Category from "../Category/Category";

const Categories = ({ formData }) => {
  const [Cards, setCards] = useState([]);

  useEffect(() => {
    test1("data.json");
  }, []);

  const test1 = (data) => {
    fetch(data)
      .then((res) => res.json())
      .then((data) => setCards(data));
  };

  //   const filteredData = Cards.filter((e) => e.category === formData);

  //   if (filteredData.length) {
  //     setCards(filteredData);
  //     console.log("Cards", Cards.length);
  //     return;
  //   }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:max-w-[1320px] mx-auto">
      {Cards.map((e, index) => {
        return (
          <Category
            key={index}
            image={e.picture}
            category={e.category}
            category_bg={e.category_bg}
            card_bg={e.card_bg}
            title={e.title}
            id={e.id}
            formData={formData}
          />
        );
      })}
    </div>
  );
};

export default Categories;
Categories.propTypes = {
  formData: PropTypes.string,
};
