import Navbar from "../Navbar";
import DetailsSection from "./DetailsSection";
import ImageSection from "./ImageSection";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function ReportDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return "Id not exist";
    }
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://192.168.1.8:8080/reports/lostItem/${id}`,
        );
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
      <section className="flex flex-col md:flex-row gap-6  justify-between px-3 sm:px-5 md:px-12 py-10 text-center bg-[#f3f2f2]">
        <ImageSection productDetails={productDetails} />
        <DetailsSection productDetails={productDetails} />
      </section>
    </>
  );
}
