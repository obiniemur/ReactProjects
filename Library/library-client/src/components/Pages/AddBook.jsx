const AddBook = () => {
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
    fetch("https://library-server-gilt.vercel.app/AddBook", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("service book successfully");
          formData.image.value = "";
          formData.bookName.value = "";
          formData.author.value = "";
          formData.quantity.value = "";
          formData.category.value = "";
          formData.description.value = "";
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-center ">Add your Books Here</h1>
      <form onSubmit={addBookHandler} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input type="text" placeholder="Enter Image URL Here" name="image" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Book Name</span>
          </label>
          <input type="text" placeholder="Enter the Book Name" name="bookName" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Author Name</span>
          </label>
          <input type="text" placeholder="Enter the author name" name="author" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input type="text" placeholder="Enter the quantity as Number. EX. 3" name="quantity" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input type="text" placeholder="Enter the Book Category" name="category" className="input input-bordered" required />
        </div>

        <textarea placeholder="Detail Description About the Book" name="description" className="textarea textarea-bordered textarea-lg w-full"></textarea>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Add the Book Now</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
