import { BadgeCheck, Handshake, Search, TriangleAlert } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

export default function DashboardSection() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <section className="border">
      <div className="px-4 text-center md:text-left">
        {/* User Info */}
        <div>
          <h4 className="text-2xl font-bold md:text-3xl">
            Welcome back, {user.name}
          </h4>
          <p className="text-lg text-gray-600">
            Your Lost Link dashboard is up to date
          </p>
        </div>
        {/* KPI(Key Performance Indicator) Cards */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full px-4 py-4 text-left bg-white border-2 border-gray-100 shadow-lg rounded-xl md:w-50">
            <span className="bg-[#D5E3FF] w-10 h-10 flex items-center justify-center rounded-lg mb-2">
              <Search size={18} />
            </span>
            <span>Total Lost</span>
            <h6 className="text-3xl font-semibold">12</h6>
          </div>
          <div className="w-full px-4 py-4 text-left bg-white border-2 border-gray-100 shadow-lg rounded-xl md:w-50">
            <span className="bg-[#D5E3FF] w-10 h-10 flex items-center justify-center rounded-lg mb-2">
              <BadgeCheck size={18} />
            </span>
            <span>Total Found</span>
            <h6 className="text-3xl font-semibold">04</h6>
          </div>
          <div className="w-full px-4 py-4 text-left bg-white border-2 border-gray-100 shadow-lg rounded-xl md:w-50">
            <span className="bg-[#D5E3FF] w-10 h-10 flex items-center justify-center rounded-lg mb-2">
              <Handshake size={18} />
            </span>
            <span>Successful Matches</span>
            <h6 className="text-3xl font-semibold">08</h6>
          </div>
          <div className="w-full px-4 py-4 text-left bg-white border-2 border-gray-100 shadow-lg rounded-xl md:w-50">
            <span className="bg-[#FFDAD6] w-10 h-10 flex items-center justify-center rounded-lg mb-2">
              <TriangleAlert size={18} color="red" />
            </span>
            <span>Active Reports</span>
            <h6 className="text-3xl font-semibold">03</h6>
          </div>
        </div>
      </div>
    </section>
  );
}
