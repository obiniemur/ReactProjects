import {DateRangePicker} from "dates-picker";
import {useLoaderData} from "react-router-dom";
import './Booking.css'

const Booking = () => {
  const data = useLoaderData();
  function callbackFunction(dates) {
    console.log(`The range of dates that got picked is: ${dates.text}`);
    console.log(`The min date that got picked is: ${dates.minDate}`);
    console.log(`The max date that got picked is: ${dates.maxDate}`);
    console.log(`The number of days that got picked is: ${dates.numberOfDaysPicked}`);
    console.log(`All dates: ${dates.allDates}`);
    
  }
  const handleBooking = () =>{
    alert('The functionality will be added soon')
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col ">
        <h1 className="md:text-5xl lg:text-5xl text-2xl font-bold">Book Your Events Now!</h1>

        <div className="card flex-shrink-0 w-full max-w-xs md:max-w-lg lg:max-w-lg shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleBooking}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input type="text" placeholder="Your Name" name="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input type="email" placeholder="Your Email" name="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Choose a Category</span>
              </label>
              <select id="cars" name="category">
                {data.map((d) => (
                  <option key={d.id} value={d.category}>
                    {d.category}
                  </option>
                ))}
              </select>
            </div>


            <label className="label">
                <span className="label-text font-bold">Choose a Date</span>
              </label>

            <div>
              <DateRangePicker callback={callbackFunction} />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Book Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
