import { useState } from "react";
export default function FilterSection() {
  const [distance, setDistance] = useState(10);
  return (
    <section className="px-3 sm:px-5 md:px-10 py-10">
      <div className="bg-white border border-gray-300 p-3 rounded-2xl flex gap-10 items-center">
        <p className="hidden md:block whitespace-nowrap">Filter by: </p>
        <div className="w-full flex justify-between md:justify-start gap-0 md:gap-30">
          <select
            name="category"
            id="category"
            className="cursor-pointer outline-none"
          >
            <option disabled selected>
              Select Category
            </option>
            <option value="All">All</option>
            <option value="Phones">Phones</option>
            <option value="Tablets">Tablets</option>
            <option value="Wallets">Wallets</option>
            <option value="Keys">Keys</option>
            <option value="Jewelries">Jewelries</option>
            <option value="Laptops">Laptops</option>
            <option value="Briefcase">Briefcase</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothings">Clothings</option>
            <option value="Watches">Watches</option>
            <option value="Documents">Documents</option>
            <option value="Pets">Pets</option>
            <option value="Others">Others</option>
          </select>
          <select name="date" id="date" className="cursor-pointer outline-none">
            <option disabled selected>
              Select Date
            </option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="7days">7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
          <div className="hidden md:flex items-center gap-3">
            <p className="text-sm font-medium whitespace-nowrap">Distance:</p>

            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-40 accent-orange-500"
            />

            <span className="text-sm text-gray-500 w-12">{distance} km</span>
          </div>
          <select
            name="Distance"
            id="Distance"
            className="flex md:hidden cursor-pointer outline-none"
          >
            <option disabled selected>
              Select Distance
            </option>
            <option value="1km">1 km</option>
            <option value="2km">2 km</option>
            <option value="5km">5 km</option>
            <option value="10km">10 km</option>
            <option value="50km">50 km</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
    </section>
  );
}
