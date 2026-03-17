export default function FilterSection() {
  return (
    <section className="px-3 sm:px-5 md:px-10 py-10">
      <div className="bg-white border border-gray-300 p-3 rounded-md">
        <p>Filter by: </p>
        <div>
          <select name="category" id="category">
            <option disabled selected>
              Select Category
            </option>
            <option value="Phones">Phones</option>
            <option value="Tablets">Tablets</option>
            <option value="Wallets">Wallets</option>
            <option value="Keys">Keys</option>
            <option value="Jewelries">Jewelries</option>
            <option value="Laptops">Laptops</option>
            <option value="Briefcase">Briefcase</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothings">Clothings</option>
            <option value="Watches">Watches</option>
            <option value="Documents">Documents</option>
            <option value="Pets">Pets</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
    </section>
  );
}
