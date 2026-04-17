import { useState, useEffect } from "react";
import { MapPin, MoveRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../../lib/api.js";

export default function SimilarReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_URL}/reports/allReports?status=open&limit=20`,
        );

        console.log("STATUS:", res.status);

        const data = await res.json();

        console.log("DATA:", data);

        setReports(Array.isArray(data.allReports) ? data.allReports : []);
      } catch (err) {
        console.log("Fetch error:", err);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold text-white">Open Reports</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-400">No open reports found</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto">
          {reports.map((report) => (
            <motion.div
              key={report._id}
              whileHover={{ y: -8 }}
              className="min-w-70 rounded-xl bg-white/10 p-4 backdrop-blur-md"
            >
              <img
                src={report.image}
                alt={report.name}
                className="h-40 w-full rounded-lg object-cover"
              />

              <h3 className="mt-3 text-lg font-semibold text-white">
                {report.name}
              </h3>

              <p className="flex items-center gap-1 text-sm text-gray-300">
                <MapPin size={14} />
                {report.location?.city}
              </p>

              <p className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                <Clock3 size={14} />
                {new Date(report.dateTime).toLocaleTimeString()}
              </p>

              <Link to={`/report/${report._id}`}>
                <button className="mt-4 flex w-full items-center justify-between rounded-lg bg-blue-500 px-3 py-2 text-sm text-white">
                  View Details <MoveRight size={16} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
