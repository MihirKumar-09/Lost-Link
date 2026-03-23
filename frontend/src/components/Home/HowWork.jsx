import { FcAnswers, FcOnlineSupport, FcLike } from "react-icons/fc";
export default function HowWork() {
  return (
    <section
      className="px-3 sm:px-5 md:px-12 py-10 text-center"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <h1 className="text-4xl font-bold mb-3">How Lost Link Works</h1>
      <p className="text-sm md:text-base text-gray-400">
        Reuniting with your belongings is as these three steps.
      </p>
      <div className="flex justify-between flex-col md:flex-row mt-10">
        <div className="flex flex-col items-center px-10 mb-10">
          <span
            className="p-2 shadow-2xl rounded-xl hover:bg-blue-600 transition"
            style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.25)" }}
          >
            <FcAnswers size={40} />
          </span>
          <h4 className="font-medium text-sm md:text-xl mb-2 mt-3">Report</h4>
          <p className="text-gray-400">
            Provide details, photos, and the approximate location of the item
            lost of found
          </p>
        </div>
        <div className="flex flex-col items-center px-10 mb-10">
          <span
            className="p-2 shadow-2xl rounded-xl hover:bg-blue-600 transition"
            style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.25)" }}
          >
            <FcOnlineSupport size={40} />
          </span>
          <h4 className="font-medium text-sm md:text-xl mb-2 mt-3">
            Community Helps
          </h4>
          <p className="text-gray-400">
            Our automated matching system and local community members identify
            potential matches.
          </p>
        </div>
        <div className="flex flex-col items-center px-10">
          <span
            className="p-2 shadow-2xl rounded-xl hover:bg-blue-600 transition"
            style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.25)" }}
          >
            <FcLike size={40} />
          </span>

          <h4 className="font-medium text-sm md:text-xl mb-2 mt-3">
            Safely Reconnect
          </h4>
          <p className="text-gray-400">
            Coordinate a safe meeting point through our secure messaging to
            return the item.
          </p>
        </div>
      </div>
    </section>
  );
}
