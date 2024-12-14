import axios from "axios";
import {useContext, useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import {dataContext} from "../AuthProvider/ContextProvider";
import {GrEdit} from "react-icons/gr";
import {MdDelete} from "react-icons/md";
import bookPlaceHolder from "../../assets/bookplace.png";

const AllBookBasedOnCategory = () => {
  const dataLoading = useLoaderData();

  const [books, setBooks] = useState(dataLoading);

  const {user} = useContext(dataContext);

  const handleBookDelete = (id) => {
    fetch(`https://library-server-gilt.vercel.app/deleteBook/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert(`${id} has been deleted`);
          const afterDeleteBook = books.filter((b) => b._id !== id);
          setBooks(afterDeleteBook);
        }
      });
  };

  const handleBorrowedBook = (id) => {
    const filteredBook = dataLoading.find((data) => data._id === id);

    const BookName = filteredBook.bookName;
    const AuthorName = filteredBook.authorName;
    const BookImage = filteredBook.image;
    const BookDescription = filteredBook.description;
    const userName = user.email;

    axios
      .post(`https://library-server-gilt.vercel.app/borrow/${id}`, {
        BookName,
        AuthorName,
        BookImage,
        BookDescription,
        userName,
      })
      .then((res) => {
        if (res.data.insertedId) {
          alert(`${BookName} has been added to your borrowed list`);
        }
      });

    /// Below fetch supposed to update the quantity but it is not working now

    //   fetch(`https://library-server-gilt.vercel.app/borrower/${id}`,{
    //     method: 'PATCH',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body:JSON.stringify({quantity: Number(quantity)})
    //   })
  };

  return (
    <div className="grid lg:grid-cols-4 gap-3 ">
      {books.map((data) => {
        return (
          <div className="card card-side bg-base-100 shadow-2xl w-[500x] m-4" key={data._id}>
            <figure>{data.image ? <img src={data.image} alt="Movie" /> : <img className="h-40 md:w-60" src={bookPlaceHolder} alt="Book PlaceHolder" />}</figure>
            <div className="card-body">
              <h2 className="card-title ">{data.bookName}</h2>
              <p className="text-xs">Author Name: {data.authorName}</p>
              <div className="card-actions justify-end">
                <button className="btn" onClick={() => document.getElementById(data._id).showModal()}>
                  Details
                </button>
              </div>
            </div>

            <dialog id={data._id} className="modal modal-middle sm:modal-middle">
              <div className="modal-box ">
                {user ? (
                  <div>
                    <Link to={`/updatebooks/${data._id}`}>
                      <button className="btn mr-4">
                        <GrEdit />
                      </button>
                    </Link>
                    <button onClick={() => handleBookDelete(data._id)} className="btn">
                      <MdDelete />
                    </button>
                  </div>
                ) : (
                  <p className="text-lg text-center text-gray-400 mb-4">Login to update the book information</p>
                )}
                <h3 className="font-bold text-lg">Book Name: {data.bookName}!</h3>
                <p className="py-4">Author Name: {data.authorName}</p>
                <p>In Stock: {data.quantity}</p>

                {data.image ? <img src={data.image} alt={data.bookName} /> : <img className="h-40 w-60" src={bookPlaceHolder} alt="Book PlaceHolder" />}
                <div>
                  <p className="text-justify mt-4">{data.description}</p>
                </div>
                {user ? (
                  <button onClick={() => handleBorrowedBook(data._id)} className="btn btn-neutral w-full mt-4">
                    Borrow This Book
                  </button>
                ) : (
                  <p className="text-center my-4 bg-orange-600 text-white">
                    You will have to login to select this book.{" "}
                    <Link to="/login">
                      <span className="font-fold text-cyan-800">Log In</span>
                    </Link>
                  </p>
                )}
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        );
      })}
    </div>
  );
};

export default AllBookBasedOnCategory;
