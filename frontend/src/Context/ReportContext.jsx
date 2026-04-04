import { createContext, useContext, useEffect, useState } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchMyReports = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/reports/my-reports", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("my reports api response:", data);

      if (!res.ok) {
        console.log(data.message || "Failed to fetch reports");
        setReports([]);
        setTotalReports(0);
        return;
      }

      setReports(data.reports || []);
      setTotalReports(data.totalReports || 0);
    } catch (err) {
      console.log("Fetch my reports error:", err);
      setReports([]);
      setTotalReports(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReports();
  }, []);

  useEffect(() => {
    console.log("reports state:", reports);
    console.log(
      "lost count:",
      reports.filter((item) => item.reportType?.toLowerCase() === "lost")
        .length,
    );
    console.log(
      "found count:",
      reports.filter((item) => item.reportType?.toLowerCase() === "found")
        .length,
    );
  }, [reports]);

  const totalLostReports = reports.filter(
    (item) => item.reportType?.toLowerCase() === "lost",
  ).length;

  const totalFoundReports = reports.filter(
    (item) => item.reportType?.toLowerCase() === "found",
  ).length;

  return (
    <ReportContext.Provider
      value={{
        reports,
        totalReports,
        totalLostReports,
        totalFoundReports,
        loading,
        fetchMyReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => useContext(ReportContext);
