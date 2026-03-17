import { CalendarCheck, Camera, SendHorizontal, Timer } from "lucide-react";
export default function LostReportForm() {
  return (
    <section className="px-3 sm:px-5 md:px-12 py-10 text-center bg-[#F8F6F6]">
      <div>
        <h1 className="text-black font-bold text-3xl md:text-5xl mb-2 text-center mt-2 md:mt-10">
          Lost Something?
        </h1>
        <p className="text-center mt-4 text-gray-500">
          Fill in the details below to help our community identify and return
          your missing property.
        </p>
      </div>
      <div className="flex justify-center mt-10 ">
        <form className="flex flex-col gap-10">
          {/* Section 1 */}
          <div className=" bg-white border-2 border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                1
              </span>
              <span className="font-medium text-lg md:text-xl">
                Item Information
              </span>
            </div>
            <div className="flex flex-col gap-2 text-left mt-5">
              <label htmlFor="name" className="font-medium text-md">
                Item Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Midnight Blue Leather Wallet"
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none"
              />
            </div>
            <div className="flex gap-4 mt-5">
              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="category" className="font-medium text-md">
                  Category
                </label>
                <select
                  id="category"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
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
              </div>

              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="color" className="font-medium text-md">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  placeholder="e.g. Navy Blue"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-left mt-5">
              <label htmlFor="brand" className="font-medium text-md">
                Brand / Model
              </label>
              <input
                type="text"
                id="brand"
                placeholder="e.g. Apple iPhone 13 Pro"
                className="border border-gray-300 rounded-lg w-90 md:w-170 p-3 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2  mt-5">
              <label htmlFor="myFile" className="font-medium text-md text-left">
                Upload Photos
              </label>
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:bg-gray-50 transition"
              >
                <span>
                  <Camera />
                </span>
                <p className="text-sm text-gray-600 font-medium">
                  <span className="text-orange-500">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </label>
              <input type="file" id="fileUpload" className="hidden" />
            </div>
          </div>
          {/* Section 2 */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                2
              </span>
              <span className="font-medium text-lg md:text-xl">
                Where Did You Lose It?
              </span>
            </div>
            <div className="flex flex-col gap-2 text-left mt-5">
              <label htmlFor="name" className="font-medium text-md">
                Location Description
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Central Park Mall, Food Court"
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none"
              />
            </div>
            <div className="mt-5">
              Live Map for choose location(We do latter)
            </div>
            <div className="flex gap-4 mt-5">
              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="date" className="font-medium text-md">
                  Lost Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    onClick={(e) => e.target.showPicker?.()}
                    placeholder="e.g. Navy Blue"
                    className=" appearance-none border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <CalendarCheck className="md:hidden" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="time" className="font-medium text-md">
                  Approximate Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="time"
                    onClick={(e) => e.target.showPicker?.()}
                    placeholder="e.g. Navy Blue"
                    className=" appearance-none border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Timer className="md:hidden" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                3
              </span>
              <span className="font-medium text-lg md:text-xl">
                Description
              </span>
            </div>

            <div className="flex flex-col gap-2 text-left mt-5">
              <label htmlFor="description" className="font-medium text-md">
                Location Description
              </label>
              <textarea
                id="description"
                placeholder="Please provide any unique identify features, content inside (if it's a bag/wallet), or special circumstance..."
                className="border border-gray-300 rounded-lg w-full h-30 md:h-40 p-3 focus:outline-none"
              />
            </div>
          </div>
          {/* section 4 */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                4
              </span>
              <span className="font-medium text-lg md:text-xl">
                Contact Details
              </span>
            </div>
            <div className="flex gap-4 mt-5">
              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="number" className="font-medium text-md">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="number"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                  placeholder="+91 (123-456-789-0)"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="email" className="font-medium text-md">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="alex@example.com"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <button className="group relative border border-gray-300 px-8 md:px-12 py-3 rounded-xl font-medium bg-white overflow-hidden transition-all duration-300">
              <span className="absolute inset-0 bg-gray-100 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="relative transition-all duration-300 group-hover:text-black">
                Cancel
              </span>
            </button>
            <button className="group flex items-center px-8 md:px-12 py-3 rounded-xl font-medium bg-[#EC5B13] text-white overflow-hidden relative transition-all duration-300 hover:shadow-lg">
              <span className="transition-all duration-300 group-hover:-translate-x-2">
                Submit Lost Item Report
              </span>

              <SendHorizontal className="ml-3 transition-all duration-300 group-hover:translate-x-3 group-hover:scale-110" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
