import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      {/* Add a Product */}
      <div className="flex flex-col mx-auto items-center justify-center w-full">
        <h1 className="text-2xl font-semibold text-center my-3">
          Add a Product
        </h1>
        <form type="submit" className="p-6 rounded-md shadow-md bg-blue-200">
          <div className="mb-4">
            <label
              htmlFor="item"
              className="block font-medium text-gray-700 text-xl"
            >
              Item Slug
            </label>
            <input
              type="text"
              id="item"
              name="item"
              className="form-input mt-1 block w-full p-2 rounded-lg"
              placeholder="Enter item slug"
              required
            />
          </div>
          <div className="flex md:flex-row flex-col justify-around md:gap-10">
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block font-medium text-gray-700 text-xl"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-input mt-1 block w-full p-2 rounded-lg"
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block font-medium text-gray-700 text-xl"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-input mt-1 block w-full p-2 rounded-lg"
                placeholder="Enter price"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>

      {/* Display Current Stock */}
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-center my-3">
          Current Stock
        </h1>
        <table className="min-w-full border-4 rounded border-blue-200">
          <thead>
            <tr className="bg-blue-200">
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-center">Item 1</td>
              <td className="py-2 px-4 border-b text-center">10</td>
              <td className="py-2 px-4 border-b text-center">$20.00</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">Item 2</td>
              <td className="py-2 px-4 border-b text-center">5</td>
              <td className="py-2 px-4 border-b text-center">$15.00</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">Item 3</td>
              <td className="py-2 px-4 border-b text-center">8</td>
              <td className="py-2 px-4 border-b text-center">$12.50</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
