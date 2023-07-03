"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      let response = await fetch("/api/product");
      let rJson = await response.json();
      setProducts(rJson.products);
      // console.log(products);
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });
      if (response.ok) {
        console.log("Product added successfully");
        setAlert("Added successfully!")
        setProductForm({});
      } else {
        console.error("Error adding product");
        setAlert("Error adding product!")
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Header />
      
      {/* Search a product  */}
      <div className="container mx-auto px-4 py-8 bg-blue-50 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="m-2">
            <select className="form-select block border-4 border-blue-200 rounded-lg p-1">
              <option value="all">All</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>

          <div className="flex-1">
            <input
              type="text"
              id="search"
              name="search"
              className="form-input w-full border-4 border-blue-200 p-1 rounded-lg"
              placeholder="Search products..."
            />
          </div>

          <div className="m-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Add a Product */}
      <div className="flex flex-col mx-auto items-center justify-center w-full">
        <h1 className="text-2xl font-semibold text-center my-3">
          Add a Product
        </h1>
        <form className="p-6 rounded-md shadow-md bg-blue-200">
          <div className="mb-4">
            <label
              htmlFor="item"
              className="block font-medium text-gray-700 text-xl"
            >
              Item Slug
            </label>
            <input
              onChange={handleChange}
              value={productForm?.slug || ""}
              type="text"
              id="item"
              name="slug"
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
                onChange={handleChange}
                value={productForm?.quantity || ""}
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
                onChange={handleChange}
                value={productForm?.price || ""}
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
          <div className=" text-green-700 mx-5">{alert}</div>
            <button
              onClick={addProduct}
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
            {products.map((product) => {
              return (
                <tr key={product.slug}>
                  <td className="py-2 px-4 border-b text-center">
                    {product.slug}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {product.quantity}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {product.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
