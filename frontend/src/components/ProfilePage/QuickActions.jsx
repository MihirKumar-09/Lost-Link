import { CircleCheck, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <section className="py-6 px-4 md:px-6">
      <div className="shadow-xl p-4 bg-white rounded-lg">
        <h6 className="text-[18px] md:text-[19px] font-medium">
          Quick Actions
        </h6>
        {/* Actions */}
        <div className="flex flex-col gap-2 md:gap-3 mt-2">
          <Link to="/lost-item-form">
            <div className="flex justify-between items-center shadow-lg shadow-[#1b4477]/40 bg-[#1B4477] text-white p-3 rounded-xl cursor-pointer">
              Report Lost Items{" "}
              <span>
                <CirclePlus />
              </span>
            </div>
          </Link>
          <Link to="/found-item-form">
            <div className="flex shadow-lg shadow-[#2E5BFF]/40 bg-[#2E5BFF] text-white justify-between items-center p-3 rounded-xl cursor-pointer">
              Report Found Items{" "}
              <span>
                <CircleCheck />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
