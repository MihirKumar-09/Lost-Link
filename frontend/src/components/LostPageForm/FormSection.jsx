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
        <h1 className="mt-2 mb-2 text-3xl font-bold text-center text-black md:text-4xl md:mt-10">
          Lost Something?
        </h1>
        <p className="mt-4 text-sm text-center text-gray-500 md:text-base">
          Fill in the details below to help our community identify and return
          your missing property.
        </p>
      </div>

      <div className="flex justify-center w-full mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-3xl gap-10"
        >
          {error && (
            <p className="text-sm font-medium text-left text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm font-medium text-left text-green-600">
              {success}
            </p>
          )}

          <div className="p-5 bg-white border-2 border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                1
              </span>
              <span className="text-lg font-medium md:text-xl">
                Item Information
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-5 text-left">
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
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
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

              <div className="flex flex-col flex-1 gap-2 text-left">
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
                value={form.model}
                onChange={handleChange}
                placeholder="e.g. Apple iPhone 13 Pro"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label
                htmlFor="fileUpload"
                className="font-medium text-left text-md"
              >
                Upload Photos
              </label>

              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center gap-2 p-8 transition border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:bg-gray-50"
              >
                <span>
                  <Camera />
                </span>
                <p className="text-sm font-medium text-gray-600">
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
                  className="object-cover w-32 h-32 mt-3 border rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                2
              </span>
              <span className="text-lg font-medium md:text-xl">
                Where Did You Lose It?
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
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Delhi"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex flex-col flex-1 gap-2 text-left">
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-5 md:flex-row">
              <div className="flex flex-col flex-1 gap-2 text-left">
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
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none"
                  />
                  <span className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2">
                    <CalendarCheck className="md:hidden" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-2 text-left">
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
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none"
                  />
                  <span className="absolute -translate-y-1/2 pointer-events-none right-3 top-1/2">
                    <Timer className="md:hidden" />
                  </span>
                </div>
              </div>
            </div>
          </div>

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
                value={form.description}
                onChange={handleChange}
                placeholder="Please provide any unique identifying features, content inside, or special circumstances..."
                className="w-full p-3 border border-gray-300 rounded-lg h-30 md:h-40 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-5 bg-white border-2 border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#FDEEE7] w-8 h-8 flex items-center justify-center rounded-full text-[#FF6900] font-medium">
                4
              </span>
              <span className="text-lg font-medium md:text-xl">
                Contact Details
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
                  value={form.phone}
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
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              onClick={handleCancel}
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
              className="cursor-pointer group flex items-center px-8 md:px-12 py-3 rounded-xl font-medium bg-[#EC5B13] text-white overflow-hidden relative transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
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
