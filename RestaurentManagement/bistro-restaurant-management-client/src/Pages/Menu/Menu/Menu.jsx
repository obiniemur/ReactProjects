import {Helmet} from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menubg from "../../../assets/menu/banner3.jpg";
import useMenu from "../../../Hooks/useMenu";
import SectionTitles from "../../../components/SectionTitle/SectionTitles";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Menu</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {/* Main Cover */}
      <Cover img={menubg} title="Our menu" />

      {/* Today Offer menu */}
      <SectionTitles subHeading="Don't Miss" heading="Today Offer" />
      <MenuCategory items={offered} />

      {/* Desserts Menu  */}

      <MenuCategory items={desserts} img={dessertImg} title={"dessert"} />

      {/* Pizza menu */}
      <MenuCategory items={pizza} img={pizzaImg} title={"pizza"} />

      {/* Salads */}

      <MenuCategory items={salad} img={saladImg} title="salad" />

      {/* Soups */}

      <MenuCategory items={soup} img={soupImg} title="soup" />

    </div>
  );
};

export default Menu;
