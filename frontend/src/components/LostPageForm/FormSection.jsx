import {
  CalendarCheck,
  Camera,
  SendHorizontal,
  Timer,
  MapPin,
  Package,
  FileText,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useReports } from "../../Context/ReportContext";

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

const sectionVariants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function LostReportForm() {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { fetchMyReports } = useReports();

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
      console.log("report create successfully");
      await fetchMyReports();
      console.log("report refetch successfully");
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/50 bg-white/70 px-4 py-3.5 text-[15px] text-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md outline-none transition duration-300 placeholder:text-gray-400 focus:border-orange-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.10)]";

  return (
    <section className="relative overflow-hidden px-3 sm:px-5 md:px-12 py-10 md:py-14 bg-[linear-gradient(180deg,#fff7ed_0%,#fffaf7_28%,#f8fafc_100%)]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/30 blur-3xl rounded-full" />
        <div className="absolute top-32 right-0 w-80 h-80 bg-pink-200/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-blue-200/20 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-sm font-medium text-orange-600 shadow-sm backdrop-blur-md">
            <Package size={16} />
            Lost Item Report
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
            Lost Something Important?
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-7 text-gray-500">
            Fill in the details below so the community can help identify and
            return your missing item faster.
          </p>
        </motion.div>

        {/* Alerts */}
        <div className="max-w-3xl mx-auto mt-8">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-left text-red-600"
            >
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-left text-green-600"
            >
              {success}
            </motion.p>
          )}
        </div>

        {/* Form */}
        <div className="flex justify-center w-full mt-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-3xl gap-7"
          >
            {/* Section 1 */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[28px] border border-white/50 bg-white/65 p-5 md:p-7 shadow-[0_12px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-pink-500 text-white shadow-lg">
                  <Package size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                    Step 01
                  </p>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Item Information
                  </h2>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5">
                <div className="text-left">
                  <label
                    htmlFor="itemName"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Midnight Blue Leather Wallet"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                  <div className="flex-1 text-left">
                    <label
                      htmlFor="category"
                      className="mb-2 block font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className={inputClass}
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

                  <div className="flex-1 text-left">
                    <label
                      htmlFor="color"
                      className="mb-2 block font-medium text-gray-700"
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      placeholder="e.g. Navy Blue"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label
                    htmlFor="model"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Brand / Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    placeholder="e.g. Apple iPhone 13 Pro"
                    className={inputClass}
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="fileUpload"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Upload Photos
                  </label>

                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.995 }}
                    htmlFor="fileUpload"
                    className="group relative flex min-h-55 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-orange-200/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9))] p-8 text-center shadow-[0_8px_30px_rgba(249,115,22,0.08)] transition"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition group-hover:scale-110">
                      <Camera size={28} />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      <span className="text-orange-500">Click to upload</span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </motion.label>

                  <input
                    type="file"
                    id="fileUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {preview && (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={preview}
                      alt="preview"
                      className="object-cover w-36 h-36 mt-4 border border-orange-100 rounded-2xl shadow-md"
                    />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[28px] border border-white/50 bg-white/65 p-5 md:p-7 shadow-[0_12px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                    Step 02
                  </p>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Where Did You Lose It?
                  </h2>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:flex-row">
                  <div className="flex-1 text-left">
                    <label
                      htmlFor="city"
                      className="mb-2 block font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="e.g. Delhi"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <label
                      htmlFor="area"
                      className="mb-2 block font-medium text-gray-700"
                    >
                      Area / Place
                    </label>
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder="e.g. Central Park Mall, Food Court"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                  <div className="flex-1 text-left">
                    <label
                      htmlFor="date"
                      className="mb-2 block font-medium text-gray-700"
                    >
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
                        className={`${inputClass} appearance-none pr-12`}
                      />
                      <span className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-gray-400">
                        <CalendarCheck size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 text-left">
                    <label
                      htmlFor="time"
                      className="mb-2 block font-medium text-gray-700"
                    >
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
                        className={`${inputClass} appearance-none pr-12`}
                      />
                      <span className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-gray-400">
                        <Timer size={18} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[28px] border border-white/50 bg-white/65 p-5 md:p-7 shadow-[0_12px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                    Step 03
                  </p>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Description
                  </h2>
                </div>
              </div>

              <div className="mt-6 text-left">
                <label
                  htmlFor="description"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Item Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Please provide any unique identifying features, content inside, or special circumstances..."
                  className={`${inputClass} h-36 md:h-40 resize-none`}
                />
              </div>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[28px] border border-white/50 bg-white/65 p-5 md:p-7 shadow-[0_12px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                    Step 04
                  </p>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Contact Details
                  </h2>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5 md:flex-row">
                <div className="flex-1 text-left">
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="flex-1 text-left">
                  <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-8 py-3.5 font-medium text-gray-700 shadow-sm transition"
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-[#EC5B13] via-orange-500 to-pink-500 px-8 md:px-12 py-3.5 font-medium text-white shadow-[0_14px_35px_rgba(236,91,19,0.30)] transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative">
                  {loading ? "Submitting..." : "Submit Lost Item Report"}
                </span>
                <SendHorizontal
                  className="relative transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  size={18}
                />
              </motion.button>
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  );
}
