import Navbar from "../Navbar";
import DetailsSection from "./DetailsSection";
import ImageSection from "./ImageSection";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarReport from "./SimilarReport";
import { API_URL } from "../../lib/api";
export default function ReportDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    window.scrollTo(0, 0);
    setProductDetails(null);
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/reports/lostItem/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setProductDetails(data.report);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetails();
  }, [id]);
  return (
    <>
      <Navbar />
      <section className="flex flex-col md:flex-row gap-6  justify-between px-3 sm:px-5 md:px-12 py-10 text-center bg-[#f3f2f2] dark:bg-[#0A1A2C]">
        <ImageSection productDetails={productDetails} />
        <DetailsSection productDetails={productDetails} />
      </section>
      <SimilarReport currentProducts={productDetails} />
    </>
  );
}
