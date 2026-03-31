import {
  BadgeCheck,
  Calendar,
  Heart,
  Info,
  MapPin,
  MessageSquare,
  Shapes,
  TimerReset,
  Trash,
} from "lucide-react";
import { cn } from "../../lib/utils.js";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DetailsSection({ productDetails }) {
  const [showEmail, setShowEmail] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const type = productDetails?.reportType;
  const { user } = useAuth();
  const navigate = useNavigate();

  const isOwner = String(user?._id) === String(productDetails?.userId);

  const handleDeleteReport = async () => {
    try {
      setIsDeleting(true);

      const res = await fetch(
        `http://localhost:8080/reports/deleteReport/${productDetails._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.log("Non-JSON response:", text);
        throw new Error("Server did not return valid JSON");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete report");
      }

      setShowConfirm(false);
      toast.success("Delete successful");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log("Delete error:", err);
      toast.error("Delete failed, try again");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!productDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="w-full md:w-1/2">
        <div className="px-5 py-3 overflow-hidden bg-white shadow-xl rounded-2xl">
          {/* Report Type */}
          <div className="flex justify-between">
            <span
              className={cn(
                "flex items-center gap-1 font-medium px-2 rounded-xl",
                type === "lost"
                  ? "bg-[#fcdfdc] text-[#cd2503]"
                  : type === "found"
                    ? "bg-[#DCFCE7] text-[#039637]"
                    : "bg-gray-200 text-gray-500",
              )}
            >
              <p className="text-[20px]">•</p>

              <p className="text-sm md:text-[15px]">
                {type === "lost"
                  ? "LOST"
                  : type === "found"
                    ? "FOUND"
                    : "UNKNOWN"}{" "}
                ITEM
              </p>
            </span>

            <span className="flex items-center gap-5">
              <span className="cursor-pointer">
                <Heart />
              </span>

              {isOwner && (
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="transition cursor-pointer hover:text-red-500"
                >
                  <Trash />
                </button>
              )}
            </span>
          </div>

          {/* Report Name & Time */}
          <div className="mt-4 text-left">
            <h2 className="text-[20px] md:text-[22px] font-medium">
              {productDetails.name} - {productDetails.color}
            </h2>

            <p className="flex items-center gap-1 mt-2 text-sm text-gray-500">
              <span>
                <TimerReset size={18} />
              </span>
              Reported{" "}
              {formatDistanceToNowStrict(new Date(productDetails?.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>

          {/* Location and Date */}
          <div className="flex max-w-md gap-6 mt-5">
            <div className="flex flex-1 flex-col gap-1 bg-[#F3F2F2] px-5 py-2 text-left rounded-xl">
              <p className="text-[12px] md:text-[13px] font-bold text-gray-500">
                LOCATION
              </p>
              <span className="flex gap-2">
                <MapPin size={20} color="#2563EB" />
                <p className="text-[12px] md:text-[16px] font-medium truncate">
                  {productDetails.location?.area},{" "}
                  {productDetails.location?.city}
                </p>
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-1 bg-[#F3F2F2] px-5 py-2 text-left rounded-xl">
              <p className="text-[12px] md:text-[14px] font-bold text-gray-500">
                {type === "lost" ? "LOST" : "FOUND"} DATE
              </p>
              <span className="flex gap-2">
                <Calendar size={20} color="#2563EB" />
                <p className="text-[12px] md:text-[16px] font-medium truncate">
                  {new Date(productDetails?.dateTime).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                    },
                  )}{" "}
                  {new Date(productDetails?.dateTime).getDate()},{" "}
                  {new Date(productDetails?.dateTime).getFullYear()}
                </p>
              </span>
            </div>
          </div>

          {/* Category & Report Status */}
          <div className="flex max-w-md gap-6 mt-5">
            <div className="flex flex-1 flex-col gap-1 bg-[#F3F2F2] px-5 py-2 text-left rounded-xl">
              <p className="text-[12px] md:text-[13px] font-bold text-gray-500">
                CATEGORY
              </p>
              <span className="flex gap-2">
                <Shapes size={20} color="#2563EB" />
                <p className="text-[12px] md:text-[16px] font-medium truncate">
                  {productDetails.category}
                </p>
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-1 bg-[#F3F2F2] px-5 py-2 text-left rounded-xl">
              <p className="text-[12px] md:text-[14px] font-bold text-gray-500">
                STATUS
              </p>
              <span className="flex gap-2">
                <Info size={20} color="#2563EB" />
                <p className="text-[12px] md:text-[16px] font-medium truncate">
                  {productDetails.status}
                </p>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center mt-10 text-left">
            <h4 className="text-sm font-medium md:text-md">DESCRIPTION:</h4>
            <p className="px-3 text-base">{productDetails.description}</p>
          </div>

          {/* Buttons */}
          <div className="bg-[#4267ec] text-center rounded-xl mt-8 flex items-center justify-center cursor-pointer">
            <span>
              <BadgeCheck color="white" />
            </span>
            <button className="p-3 text-lg font-medium text-white cursor-pointer">
              {productDetails.reportType === "lost"
                ? "I found this (Report Now)"
                : "This is Mine (Claim item)"}
            </button>
          </div>

          <div
            onClick={() => setShowEmail((prev) => !prev)}
            className="flex items-center justify-center mt-8 text-center border-gray-200 cursor-pointer border-3 rounded-xl"
          >
            {!showEmail && (
              <span>
                <MessageSquare color="black" />
              </span>
            )}
            <button className="p-3 text-lg font-medium text-black cursor-pointer">
              {showEmail ? productDetails?.contact?.email : "Contact Details"}
            </button>
          </div>
        </div>
      </section>

      {/* Custom Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-900">
              Delete Report?
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              This action cannot be undone. Are you sure you want to delete this
              report?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => !isDeleting && setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteReport}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
