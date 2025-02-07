// import React, { useState } from 'react';

// const CreateProduct = () => {
//   // State to hold the product data
//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     category: '',
//     skin_type_suitability: '',
//     image: '',
//     brand: '',
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({
//       ...productData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert('Product created successfully!');
//         console.log(data);
//       } else {
//         alert('Error creating product!');
//       }
//     } catch (error) {
//       alert('Error creating product!');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-center mb-6">Create a New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={productData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Description</label>
//           <textarea
//             name="description"
//             value={productData.description}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={productData.price}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Stock</label>
//           <input
//             type="number"
//             name="stock"
//             value={productData.stock}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Category</label>
//           <input
//             type="text"
//             name="category"
//             value={productData.category}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Skin Type Suitability</label>
//           <input
//             type="text"
//             name="skin_type_suitability"
//             value={productData.skin_type_suitability}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Image </label>
//           <input
//             type="file"
//             name="image"
//             value={productData.image}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-lg font-semibold">Brand</label>
//           <input
//             type="text"
//             name="brand"
//             value={productData.brand}
//             onChange={handleChange}
//             required
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;

import React, { useState } from 'react';

const CreateProduct = () => {
  // State to hold the product data
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    skin_type_suitability: '',
    image: '',
    brand: '',
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle file input change for image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      image: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send as multipart/form-data
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('category', productData.category);
    formData.append('skin_type_suitability', productData.skin_type_suitability);
    formData.append('brand', productData.brand);
    formData.append('image', productData.image); // Add image as FormData

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData, // Send form data (including image)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Product created successfully!');
        console.log(data);
      } else {
        alert('Error creating product!');
      }
    } catch (error) {
      alert('Error creating product!');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-lg font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Stock</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Skin Type Suitability</label>
          <input
            type="text"
            name="skin_type_suitability"
            value={productData.skin_type_suitability}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

