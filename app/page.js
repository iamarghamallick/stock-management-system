"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState();
  const [dropdown, setDropdown] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCurrStock, setLoadingCurrStock] = useState(false);
  const [loadingAddItem, setLoadingAddItem] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingCurrStock(true);
      let response = await fetch("/api/product");
      let rJson = await response.json();
      setProducts(rJson.products);
      // console.log(products);
      setLoadingCurrStock(false);
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      setLoadingAddItem(true);
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });
      if (response.ok) {
        // console.log("Product added successfully");
        setAlert("Added successfully!");
        setTimeout(() => {
          setAlert("");
        }, 5000);
        setProductForm({});
        setLoadingAddItem(false);
      } else {
        // console.error("Error adding product");
        setAlert("Error adding product!");
        setLoadingAddItem(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }

    // sync the product
    let response = await fetch("/api/product");
    let rJson = await response.json();
    setProducts(rJson.products);
  };

  const onDropdownEdit = async (e) => {
    setLoading(true);
    let value = e.target.value;
    setQuery(value);
    if (query.length > 0) {
      let response = await fetch("/api/search?query=" + query);
      let rJson = await response.json();
      setDropdown(rJson.products);
      setLoading(false);
    } else {
      setDropdown([]);
      setLoading(false);
    }
  };

  const buttonAction = async (action, slug, initialQuantity) => {
    // console.log(action, slug, initialQuantity);
    // Immediately change the product quantity with the given slug in products
    let index = products.findIndex((item) => item.slug == slug);
    let newProducts = JSON.parse(JSON.stringify(products));
    if (action === "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }
    setProducts(newProducts);

    // Immediately change the product quantity with the given slug in dropdown
    let indexDrop = dropdown.findIndex((item) => item.slug == slug);
    let newDropdown = JSON.parse(JSON.stringify(dropdown));
    if (action === "plus") {
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) + 1;
    } else {
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropdown(newDropdown);

    setLoadingSearch(true);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    let rjson = await response.json();
    // console.log(rjson);
    setLoadingSearch(false);
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
            </select>
          </div>

          <div className="flex-1">
            <input onChange={onDropdownEdit} type="text" id="search" name="search" className="form-input w-full border-4 border-blue-200 rounded-lg p-1" placeholder="Search products..." />
          </div>

          <div className="m-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-100">
              <div className="w-full flex justify-center">
                {loading ? (
                  <ThreeDots height="30" width="60" radius="9" color="white" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
                ) : (
                  "Search"
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* drop down  */}
      {!loading && (
        <div className="container w-full mx-auto">
          {dropdown.map((item) => {
            return (
              <div key={item.slug} className="w-full bg-blue-200 rounded-lg p-1 flex my-1">
                <div className="flex justify-between w-full">
                  <p className="mx-2"> {item.slug} ( <span className="font-semibold">{item.quantity}</span>{" "} Available of{" "} <span className="font-semibold">₹ {item.price}</span>)
                  </p>
                  <div className="flex gap-1 items-center">
                    <button onClick={() => { buttonAction("plus", item.slug, item.quantity); }} disabled={loadingSearch} className="disabled:bg-blue-400 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 rounded-md h-8">+</button>
                    <p className="w-10 text-center">{item.quantity}</p>
                    <button onClick={() => { buttonAction("minus", item.slug, item.quantity); }} disabled={loadingSearch} className="disabled:bg-blue-400 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 rounded-md h-8">-</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add a Product */}
      <div className="flex flex-col mx-auto items-center justify-center w-full">
        <h1 className="text-2xl font-semibold text-center my-3">Add a Product</h1>
        <form className="p-6 rounded-md shadow-md bg-blue-200">
          <div className="mb-4">
            <label htmlFor="item" className="block font-medium text-gray-700 text-xl">Item Slug</label>
            <input onChange={handleChange} value={productForm?.slug || ""} type="text" id="item" name="slug" className="form-input mt-1 block w-full p-2 rounded-lg" placeholder="Enter item slug" required />
          </div>
          <div className="flex md:flex-row flex-col justify-around md:gap-10">
            <div className="mb-4">
              <label htmlFor="quantity" className="block font-medium text-gray-700 text-xl">Quantity</label>
              <input onChange={handleChange} value={productForm?.quantity || ""} type="number" id="quantity" name="quantity" className="form-input mt-1 block w-full p-2 rounded-lg" placeholder="Enter quantity" required />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-medium text-gray-700 text-xl">Price
              </label>
              <input onChange={handleChange} value={productForm?.price || ""} type="number" id="price" name="price" className="form-input mt-1 block w-full p-2 rounded-lg" placeholder="Enter price" required />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className=" text-green-700 mx-5">{alert}</div>
            <button
              onClick={addProduct}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
              {loadingAddItem ? (
                <ThreeDots height="30" width="75" radius="9" color="white" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
              ) : (
                "Add Item"
              )}
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
                  <td className="py-2 px-4 border-b text-center">{product.slug}</td>
                  <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
                  <td className="py-2 px-4 border-b text-center">₹ {product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center">
          {loadingCurrStock && (
            <ThreeDots height="80" width="80" radius="9" color="blue" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
