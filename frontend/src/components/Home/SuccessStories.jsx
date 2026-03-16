const stories = [
  {
    image: "images/Home/image1.jpeg",
    name: "Sarah Jenkins",
    item: "Wedding Ring",
    description:
      "I was devastated when I lost my ring at the park. Within 24 hours of posting on Lost Link, an honest soul contacted me. Thank you! ",
    helpType: "Recovered",
  },
  {
    image: "images/Home/image2.jpeg",
    name: "Mark Thomson",
    item: "Mac Pro",
    description:
      "Found a laptop at the airport. Lost Link made is so easy to find the owner without reveling my personal info until I felt safe. ",
    helpType: "Returned",
  },
  {
    image: "images/Home/image3.jpeg",
    name: "Leo Martinez",
    item: "Keys",
    description:
      "Losing my car keys could have cost me hundreds. Lost Link saved the day! Great community and very easy to use.",
    helpType: "Returned",
  },
];
export default function SuccessStories() {
  return (
    <section
      className="px-3 sm:px-5 md:px-12 py-10 text-center"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <h3 className="text-3xl mt-5 mb-8 font-semibold">Success Stories</h3>
      <div className="flex flex-col md:flex-row  gap-4 md:gap-8">
        {stories.map((story, key) => (
          <div
            key={key}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0">
                <img
                  src={story.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </span>

              <div className="text-left">
                <h4 className="font-semibold text-gray-800">{story.name}</h4>
                <p className="text-sm text-gray-500 text-left">
                  <span>{story.helpType}</span> : <span>{story.item}</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-3 leading-relaxed text-left">
              "{story.description}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
