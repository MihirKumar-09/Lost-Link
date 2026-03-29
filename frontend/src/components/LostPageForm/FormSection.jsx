import { CalendarCheck, Camera, SendHorizontal, Timer } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// create a initial form;
const initialForm = {
  name: "",
  category: "",
  color: "",
  model: "",
  city: "",
  area: "",
  date: "",
  time: "",
  description: "",
  phone: "",
  email: "",
  image: null,
};
export default function LostReportForm() {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setForm(initialForm);
    setPreview("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) return setError("Item name is required");
    if (!form.category) return setError("Category is required");
    if (!form.color.trim()) return setError("Color is required");
    if (!form.city.trim()) return setError("City is required");
    if (!form.area.trim()) return setError("Area is required");
    if (!form.date) return setError("Lost date is required");
    if (!form.time) return setError("Approximate time is required");
    if (!form.description.trim()) return setError("Description is required");
    if (!form.email.trim()) return setError("Email is required");
    if (!form.image) return setError("Image is required");

    const dateTime = new Date(`${form.date}T${form.time}`);

    if (Number.isNaN(dateTime.getTime())) {
      return setError("Invalid date or time");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("category", form.category);
      formData.append("color", form.color.trim());
      formData.append("model", form.model.trim());
      formData.append("city", form.city.trim());
      formData.append("area", form.area.trim());
      formData.append("dateTime", dateTime.toISOString());
      formData.append("description", form.description.trim());
      formData.append("phone", form.phone.trim());
      formData.append("email", form.email.trim());
      formData.append("image", form.image);

      const res = await fetch("http://localhost:8080/reports/newLostReport", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create lost report");
      }

      setSuccess("Lost report submitted successfully");
      setForm(initialForm);
      setPreview("");
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="px-3 sm:px-5 md:px-12 py-10 text-center bg-[#F8F6F6]">
      <div>
        <h1 className="text-black font-bold text-3xl md:text-4xl mb-2 text-center mt-2 md:mt-10">
          Lost Something?
        </h1>
        <p className="text-center mt-4 text-gray-500 text-sm md:text-base">
          Fill in the details below to help our community identify and return
          your missing property.
        </p>
      </div>

      <div className="flex justify-center mt-10 w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 w-full max-w-3xl"
        >
          {error && (
            <p className="text-red-600 text-sm text-left font-medium">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-left font-medium">
              {success}
            </p>
          )}

          <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                1
              </span>
              <span className="font-medium text-lg md:text-xl">
                Item Information
              </span>
            </div>

            <div className="flex flex-col gap-2 text-left mt-5">
              <label htmlFor="itemName" className="font-medium text-md">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Midnight Blue Leather Wallet"
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none"
              />
            </div>

            <div className="flex gap-4 mt-5 flex-col md:flex-row">
              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="category" className="font-medium text-md">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
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
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  placeholder="e.g. Navy Blue"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left mt-5">
              <label htmlFor="model" className="font-medium text-md">
                Brand / Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="e.g. Apple iPhone 13 Pro"
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label
                htmlFor="fileUpload"
                className="font-medium text-md text-left"
              >
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

              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-lg border mt-3"
                />
              )}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                2
              </span>
              <span className="font-medium text-lg md:text-xl">
                Where Did You Lose It?
              </span>
            </div>

            <div className="flex gap-4 mt-5 flex-col md:flex-row">
              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="city" className="font-medium text-md">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Delhi"
                  className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="area" className="font-medium text-md">
                  Area / Place
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="e.g. Central Park Mall, Food Court"
                  className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-5 flex-col md:flex-row">
              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="date" className="font-medium text-md">
                  Lost Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    onClick={(e) => e.target.showPicker?.()}
                    className="appearance-none border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
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
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    onClick={(e) => e.target.showPicker?.()}
                    className="appearance-none border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Timer className="md:hidden" />
                  </span>
                </div>
              </div>
            </div>
          </div>

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
                Item Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Please provide any unique identifying features, content inside, or special circumstances..."
                className="border border-gray-300 rounded-lg w-full h-30 md:h-40 p-3 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                4
              </span>
              <span className="font-medium text-lg md:text-xl">
                Contact Details
              </span>
            </div>

            <div className="flex gap-4 mt-5 flex-col md:flex-row">
              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="phone" className="font-medium text-md">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1 text-left">
                <label htmlFor="email" className="font-medium text-md">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between items-center">
            <button
              type="button"
              onClick={handleCancel}
              className="group relative border border-gray-300 px-8 md:px-12 py-3 rounded-xl font-medium bg-white overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gray-100 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="relative transition-all duration-300 group-hover:text-black">
                Cancel
              </span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group flex items-center px-8 md:px-12 py-3 rounded-xl font-medium bg-[#EC5B13] text-white overflow-hidden relative transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="transition-all duration-300 group-hover:-translate-x-2">
                {loading ? "Submitting..." : "Submit Lost Item Report"}
              </span>

              <SendHorizontal className="ml-3 transition-all duration-300 group-hover:translate-x-3 group-hover:scale-110" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
