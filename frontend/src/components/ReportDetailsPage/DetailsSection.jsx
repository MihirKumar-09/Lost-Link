import {
  BadgeCheck,
  Calendar,
  Heart,
  Info,
  MapPin,
  MessageSquare,
  Shapes,
  TimerReset,
} from "lucide-react";
import { cn } from "../../lib/utils.js";
import { formatDistanceToNowStrict } from "date-fns";
export default function DetailsSection({ productDetails }) {
  const type = productDetails?.reportType;
  if (!productDetails) {
    return <p>Loading...</p>;
  }
  return (
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

            <p className={cn("text-sm md:text-[15px]")}>
              {type === "lost"
                ? "LOST"
                : type === "found"
                  ? "FOUND"
                  : "UNKNOWN"}{" "}
              ITEM
            </p>
          </span>
          <span>
            <Heart className="text-gray-400" />
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
              <MapPin size={20} color="#2563EB" />{" "}
              <p className="text-[12px] md:text-[16px] font-medium truncate">
                {productDetails.location.area}, {productDetails.location.city}
              </p>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1 bg-[#F3F2F2] px-5 py-2 text-left rounded-xl">
            <p className="text-[12px] md:text-[14px] font-bold text-gray-500">
              {type === "lost" ? "LOST" : "FOUND"} DATE
            </p>
            <span className="flex gap-2">
              <Calendar size={20} color="#2563EB" />{" "}
              <p className="text-[12px] md:text-[16px] font-medium truncate">
                {new Date(productDetails?.dateTime).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                  },
                )}{" "}
                {new Date(productDetails.dateTime).getDate()},{" "}
                {new Date(productDetails.dateTime).getFullYear()}
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
              <Shapes size={20} color="#2563EB" />{" "}
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
              <Info size={20} color="#2563EB" />{" "}
              <p className="text-[12px] md:text-[16px] font-medium truncate">
                {productDetails.status}
              </p>
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 text-left">
          <h4 className="text-sm font-medium md:text-md">ITEM DESCRIPTION</h4>
          <p className="px-3 text-sm">{productDetails.description}</p>
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
        <div className="flex items-center justify-center mt-8 text-center border-gray-200 cursor-pointer border-3 rounded-xl">
          <span>
            <MessageSquare color="black" />
          </span>
          <button className="p-3 text-lg font-medium text-black cursor-pointer">
            Contact Details
          </button>
        </div>
      </div>
    </section>
  );
}
