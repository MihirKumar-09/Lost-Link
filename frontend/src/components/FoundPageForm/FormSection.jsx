import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Camera,
  SendHorizontal,
  ShieldAlert,
  Timer,
} from "lucide-react";

export default function FoundReportForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    model: "",
    city: "",
    area: "",
    foundDate: "",
    foundTime: "",
    description: "",
    phone: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!image) {
      setError("Please upload an image.");
      return;
    }

    if (!formData.foundDate || !formData.foundTime) {
      setError("Please select both found date and time.");
      return;
    }

    const combinedDateTime = new Date(
      `${formData.foundDate}T${formData.foundTime}`,
    );

    if (isNaN(combinedDateTime.getTime())) {
      setError("Invalid found date/time.");
      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("category", formData.category);
      submitData.append("color", formData.color);
      submitData.append("model", formData.model);
      submitData.append("city", formData.city);
      submitData.append("area", formData.area);
      submitData.append("dateTime", combinedDateTime.toISOString());
      submitData.append("description", formData.description);
      submitData.append("phone", formData.phone);
      submitData.append("email", formData.email);
      submitData.append("image", image);

      const res = await fetch("http://localhost:8080/reports/newFoundReport", {
        method: "POST",
        body: submitData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit found report");
      }

      setSuccess("Found report submitted successfully.");

      setFormData({
        name: "",
        category: "",
        color: "",
        model: "",
        city: "",
        area: "",
        foundDate: "",
        foundTime: "",
        description: "",
        phone: "",
        email: "",
      });
      setImage(null);
      setPreview("");

      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-3 sm:px-5 md:px-12 py-10 text-center bg-[#F8F6F6]">
      <div>
        <h1 className="mt-2 mb-2 text-3xl font-bold text-center text-black md:text-4xl md:mt-10">
          Report a Found Item
        </h1>
        <p className="mt-4 text-sm text-center text-gray-500 md:text-base">
          Help return lost belongings to their rightful owner by reporting what
          you found.
        </p>
      </div>

      <div className="flex justify-center w-full mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-3xl gap-10"
        >
          {/* Section 1 */}
          <div className="p-5 bg-white border-2 border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                1
              </span>
              <span className="text-lg font-medium md:text-xl">
                Item Details
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-5 text-left">
              <label htmlFor="name" className="font-medium text-md">
                Item Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Blue iPhone 13, Brown Leather Wallet"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-4 mt-5 md:flex-row">
              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="category" className="font-medium text-md">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                >
                  <option value="">Select Category</option>
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

              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="color" className="font-medium text-md">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g. Midnight Blue, Silver"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5 text-left">
              <label htmlFor="model" className="font-medium text-md">
                Brand / Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. Apple, Samsung"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label htmlFor="image" className="font-medium text-left text-md">
                Item Photo
              </label>

              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center gap-2 p-8 transition border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:bg-gray-50"
              >
                <Camera />
                <p className="text-sm font-medium text-gray-600">
                  Click to upload or browse
                </p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </label>

              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-32 h-32 mt-3 border rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Section 2 */}
          <div className="p-5 bg-white border-2 border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                2
              </span>
              <span className="text-lg font-medium md:text-xl">
                Where Did You Find It?
              </span>
            </div>

            <div className="flex flex-col gap-4 mt-5 md:flex-row">
              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="city" className="font-medium text-md">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Delhi"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="area" className="font-medium text-md">
                  Area / Location
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. Rajiv Chowk Metro Station"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-5 md:flex-row">
              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="foundDate" className="font-medium text-md">
                  Found Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="foundDate"
                    name="foundDate"
                    value={formData.foundDate}
                    onChange={handleChange}
                    onClick={(e) => e.target.showPicker?.()}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none"
                  />
                  <span className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2">
                    <CalendarCheck className="md:hidden" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="foundTime" className="font-medium text-md">
                  Approximate Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="foundTime"
                    name="foundTime"
                    value={formData.foundTime}
                    onChange={handleChange}
                    onClick={(e) => e.target.showPicker?.()}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none"
                  />
                  <span className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2">
                    <Timer className="md:hidden" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="p-5 bg-white border-2 border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                3
              </span>
              <span className="text-lg font-medium md:text-xl">
                Description
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-5 text-left">
              <label htmlFor="description" className="font-medium text-md">
                Item Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details like condition, scratches, or other visible features. Do not share highly sensitive private details."
                className="w-full p-3 border border-gray-300 rounded-lg h-30 md:h-40 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="p-5 bg-white border-2 border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                4
              </span>
              <span className="text-lg font-medium md:text-xl">
                Safe Contact Method
              </span>
            </div>

            <div className="flex flex-col gap-4 mt-5 md:flex-row">
              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="phone" className="font-medium text-md">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2 text-left">
                <label htmlFor="email" className="font-medium text-md">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {(error || success) && (
            <div className="text-left">
              {error && <p className="font-medium text-red-600">{error}</p>}
              {success && (
                <p className="font-medium text-green-600">{success}</p>
              )}
            </div>
          )}

          <div className="border border-orange-300 rounded-2xl flex gap-5 pl-4 py-5 pr-4 md:pr-20 bg-[#FFFBEB] mb-4">
            <span>
              <ShieldAlert color="#EC5B13" />
            </span>
            <span className="text-left">
              <h6 className="text-[#993402] font-medium">Security Notice</h6>
              <p className="text-[#EC5B13] mt-2">
                To protect the rightful owner, do not reveal highly sensitive
                details publicly. Use those details later for verification.
              </p>
            </span>
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="relative px-8 py-3 overflow-hidden font-medium transition-all duration-300 bg-white border border-gray-300 cursor-pointer group md:px-12 rounded-xl"
            >
              <span className="absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-gray-100 group-hover:scale-x-100"></span>
              <span className="relative transition-all duration-300 group-hover:text-black">
                Cancel
              </span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group flex cursor-pointer items-center px-8 md:px-12 py-3 rounded-xl font-medium bg-[#EC5B13] text-white overflow-hidden relative transition-all duration-300 hover:shadow-lg disabled:opacity-70"
            >
              <span className="transition-all duration-300 group-hover:-translate-x-2">
                {loading ? "Submitting..." : "Submit Found Item Report"}
              </span>
              <SendHorizontal className="ml-3 transition-all duration-300 group-hover:translate-x-3 group-hover:scale-110" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
