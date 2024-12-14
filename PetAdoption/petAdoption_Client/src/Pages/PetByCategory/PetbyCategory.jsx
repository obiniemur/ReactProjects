import {Link, useLoaderData} from "react-router-dom";

const PetbyCategory = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-2 mt-4">
      {data.map((item) => {
        return (
          <div key={item._id} className="card   bg-yellow-400 shadow-xl">
            <figure>
              <img className="h-[300px] w-full mix-blend-normal" src={item.petImage} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item.name}
                {item.adoption && <div className="badge badge-secondary">Adopted Already</div>}
              </h2>
              <p>{item.short_desc}</p>
              <div className="card-actions justify-end">
                {!item.adoption ? (
                  <Link to={`${item._id}`}>
                    <button className="btn btn-outline">View Details</button>
                  </Link>
                ) : (
                  <button className="btn btn-disabled">View Details</button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PetbyCategory;
