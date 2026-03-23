export default function ImageSection({ productDetails }) {
  return (
    <section className="w-full md:w-1/2">
      <div className="border-4 border-white rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
        {productDetails ? (
          <div className="w-full aspect-4/4 md:aspect-4/3 overflow-hidden group">
            <img
              src={productDetails.image}
              alt="Report Image"
              className="w-full h-full object-cover brightness-90 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-2 group-hover:brightness-110"
            />
          </div>
        ) : (
          <div className="w-full aspect-square flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </section>
  );
}
