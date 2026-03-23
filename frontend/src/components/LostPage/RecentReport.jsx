import { MapPin, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils.js";
import { Link } from "react-router-dom";
export default function RecentReport() {
  const [allReports, setAllReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://192.168.1.8:8080/reports/lostItems?limit=8",
        );
        if (!res.ok) {
          throw new Error("Failed");
        }
        const data = await res.json();
        setAllReport(data.lostReports);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="px-3 sm:px-5 md:px-12 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Text Section */}
        <div>
          <h4 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Recently Lost Items
          </h4>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Stay updated with the latest items reported in your area
          </p>
        </div>

        {/* Button */}
        <div className="hidden md:block ">
          <button className="w-full sm:w-auto bg-[#3358D4] text-white px-5 py-2 rounded-lg text-sm md:text-base font-medium shadow-sm hover:bg-[#2c4cc2] transition cursor-pointer">
            View All
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allReports.map((report) => (
          <div
            key={report._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-90 sm:h-70 md:h-62 lg:h-56 overflow-hidden">
              <img
                src={report.image}
                alt="Report"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h6 className="font-semibold text-lg">{report.name}</h6>
                <p className="text-sm bg-[#e7731b2e] px-2 py-1 text-[#F97316] rounded-2xl">
                  {report.category}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={16} />
                <span>
                  {report.location.city}, {report.location.area}
                </span>
              </div>

              {/* Report Type & Status */}
              <div className="flex gap-2">
                {/* Report Type */}
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    report.reportType === "lost"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white",
                  )}
                >
                  {report.reportType}
                </span>

                {/* Status */}
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    report.status === "closed"
                      ? "bg-gray-600 text-white"
                      : "bg-yellow-500 text-white",
                  )}
                >
                  {report.status === "closed" ? "Closed" : "Open"}
                </span>
              </div>

              <hr className="text-gray-300" />

              {/* Footer */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {new Date(report.dateTime).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  , {new Date(report.dateTime).getFullYear()}
                </span>

                <Link to={`/lostItem/${report._id}`}>
                  <span className="flex items-center gap-1 text-[#3358D4] cursor-pointer font-medium hover:text-blue-400">
                    Details <MoveRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="block md:hidden w-full bg-[#3358D4] text-white mt-5 p-3 rounded-md shadow-xl">
        View All
      </button>
    </section>
  );
}
