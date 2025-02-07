const express = require("express");
const Product = require("./products.model");
const path = require('path');

const multer = require('multer');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
  },
});

const upload = multer({ storage: storage });

// POST route to create a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { vendor_id, name, description, price, stock, category, brand, skin_type_suitability } = req.body;
    const image = req.file ? req.file.path : null; // Handle image file if provided

    // Create a new product in the database
    const product = await Product.create({
      vendor_id,
      name,
      description,
      price,
      stock,
      category,
      brand,
      image, // Store the image path in the database
      skin_type_suitability,
    });

    // Send the success response with product data
    res.status(201).json({
      message: 'Product created successfully!',
      product,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
});

module.exports = router;

// // Create a product
// router.post("/create-product", async (req, res) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ message: "Failed to create product" });
//   }
// });

// // Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// });

// // Get single product
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findByPk(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).json({ message: "Failed to fetch product" });
//   }
// });

// // Update a product
// router.patch("/update-product/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.update(req.body, {
//       where: { product_id: req.params.id },
//     });
//     if (!updatedProduct[0]) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Product updated successfully" });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ message: "Failed to update product" });
//   }
// });

// // Delete a product
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Product.destroy({
//       where: { product_id: req.params.id },
//     });
//     if (!deleted) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({ message: "Failed to delete product" });
//   }
// });

// module.exports = router;
