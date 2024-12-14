import {useLoaderData, useNavigate} from "react-router-dom";

const UpdateBookInfo = () => {
  const dataLoading = useLoaderData();
  const navigate = useNavigate();
 

  let img = "";
  let nameBook = "";
  let nameAuthor = "";
  let quantity = 0;
  let category = "";
  let des = "";
  let bookId = "";

  dataLoading.map((data) => {
    img = data.image;
    nameBook = data.bookName;
    nameAuthor = data.authorName;
    quantity = data.quantity;
    category = data.lowerCaseCategory;
    des = data.description;
    bookId = data._id;
  });



  const addBookHandler = (event) => {
    event.preventDefault();

    const formData = event.target;

    const image = formData.image.value;
    const bookName = formData.bookName.value;
    const authorName = formData.author.value;
    const quantity = parseInt(formData.quantity.value);
    const category = formData.category.value;
    const lowerCaseCategory = category.toLowerCase();
    const description = formData.description.value;

    const bookInfo = {image, bookName, authorName, quantity, lowerCaseCategory, description};

    fetch(`https://library-server-gilt.vercel.app/updateBooks/${bookId}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookInfo),
    })
      .then((res) => res.json())
      .then((data) => {
      
        if (data.modifiedCount > 0) {
          alert("The book has updated successfully");
          navigate(`/books/${lowerCaseCategory}`)
        }
      });
  };
  return (
    <div>
      <h1 className="text-3xl text-center ">Update The Book Here your Books Here</h1>
      <form onSubmit={addBookHandler} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input type="text" placeholder="Enter Image URL Here" name="image" defaultValue={img} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Book Name</span>
          </label>
          <input type="text" placeholder="Enter the Book Name" name="bookName" defaultValue={nameBook} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Author Name</span>
          </label>
          <input type="text" placeholder="Enter the author name" name="author" defaultValue={nameAuthor} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input type="text" placeholder="Enter the quantity as Number. EX. 3" name="quantity" defaultValue={quantity} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input type="text" placeholder="Enter the Book Category" name="category" defaultValue={category} className="input input-bordered" required />
        </div>

        <textarea placeholder="Detail Description About the Book" name="description" defaultValue={des} className="textarea textarea-bordered textarea-lg w-full"></textarea>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Add the Book Now</button>
        </div>
      </form>
    </div>
  );
};
export default UpdateBookInfo;
