import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Camera,
  SendHorizontal,
  ShieldAlert,
  Timer,
  MapPin,
  Package,
  FileText,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useReports } from "../../Context/ReportContext";

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

export default function FoundReportForm() {
  const navigate = useNavigate();
  const { fetchMyReports } = useReports();

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
      await fetchMyReports();
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-white/50 bg-white/70 px-4 py-3.5 text-[15px] text-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md outline-none transition duration-300 placeholder:text-gray-400 focus:border-orange-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.10)]";

  return (
    <section className="relative overflow-hidden px-3 sm:px-5 md:px-12 py-10 md:py-14 bg-[linear-gradient(180deg,#fff7ed_0%,#fffaf7_28%,#f8fafc_100%)]">
      {/* Background Glow */}
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
            Found Item Report
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
            Report a Found Item
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-7 text-gray-500">
            Help return lost belongings to their rightful owner by reporting the
            item you found.
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
                    Item Details
                  </h2>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5">
                <div className="text-left">
                  <label
                    htmlFor="name"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Blue iPhone 13, Brown Leather Wallet"
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
                      value={formData.category}
                      onChange={handleChange}
                      className={inputClass}
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
                      value={formData.color}
                      onChange={handleChange}
                      placeholder="e.g. Midnight Blue, Silver"
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
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g. Apple, Samsung"
                    className={inputClass}
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="image"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Item Photo
                  </label>

                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.995 }}
                    htmlFor="image"
                    className="group relative flex min-h-55 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-orange-200/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9))] p-8 text-center shadow-[0_8px_30px_rgba(249,115,22,0.08)] transition"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition group-hover:scale-110">
                      <Camera size={28} />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      <span className="text-orange-500">Click to upload</span>{" "}
                      or browse
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </motion.label>

                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {preview && (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={preview}
                      alt="Preview"
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
                    Where Did You Find It?
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
                      value={formData.city}
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
                      Area / Location
                    </label>
                    <input
                      type="text"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="e.g. Rajiv Chowk Metro Station"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                  <div className="flex-1 text-left">
                    <label
                      htmlFor="foundDate"
                      className="mb-2 block font-medium text-gray-700"
                    >
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
                        className={`${inputClass} appearance-none pr-12`}
                      />
                      <span className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-gray-400">
                        <CalendarCheck size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 text-left">
                    <label
                      htmlFor="foundTime"
                      className="mb-2 block font-medium text-gray-700"
                    >
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
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details like condition, scratches, or other visible features. Do not share highly sensitive private details."
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
                    Safe Contact Method
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
                    value={formData.phone}
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[28px] border border-orange-200 bg-[linear-gradient(180deg,#fffdf7_0%,#fff7ed_100%)] p-5 md:p-6 shadow-[0_10px_35px_rgba(249,115,22,0.08)]"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                  <ShieldAlert size={20} />
                </div>

                <div className="text-left">
                  <h6 className="font-semibold text-[#993402]">
                    Security Notice
                  </h6>
                  <p className="text-[#C2410C] mt-2 leading-7 text-sm md:text-base">
                    To protect the rightful owner, do not reveal highly
                    sensitive details publicly. Keep those details for later
                    verification.
                  </p>
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
                onClick={() => navigate("/")}
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
                  {loading ? "Submitting..." : "Submit Found Item Report"}
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
