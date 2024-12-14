
import SectionTitles from "../../../components/SectionTitle/SectionTitles";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
  

    const [menu] = useMenu();
    const popular = menu.filter(item=> item.category === 'popular')




    return (
        <section className="mb-12">
           <SectionTitles heading="From Our Menu" subHeading="Popular Items"/>

           <div className="grid md:grid-cols-2 gap-10 text-[#737373]">
            {
                popular.map(item=> <MenuItem key={item._id} item={item}/>)
            }
            
           </div>

          <Link to='/menu'><div className="text-center"> <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button></div></Link>
           

        </section>
    );
};

export default PopularMenu;