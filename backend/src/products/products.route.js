const express = require("express");
const Product = require("./products.model");
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });


// backend/src/products/product.route.js
// backend/src/products/product.route.js
router.get("/total-products", async (req, res) => {
  try {
    const vendorId = 1;  // Assuming vendor_id is always 1 for now
    const totalProducts = await Product.count({
      where: { vendor_id: vendorId }  // Count only products for this vendor
    });
    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error("Error fetching total products:", error);
    res.status(500).json({ message: "Failed to fetch total products" });
  }
});


// Create a product (updated to use vendor_id from session)
router.post("/create-product", upload.single("image"), async (req, res) => {
  try {
    // Retrieve vendor_id from session
    const vendor_id = "1"; // Replace with the actual vendor ID if needed


    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get the file path

    // Create a new product with vendor_id
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      skin_type_suitability: req.body.skin_type_suitability,
      brandname: req.body.brand,
      stock: req.body.stock,
      image: imageUrl, // Store the image URL in the database
      vendor_id: vendor_id, // Set vendor_id from session
    });

    res.status(201).json(newProduct); // Respond with the created product
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});



// Fetch all products (with vendor_id = 1)
router.get('/display_products', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { vendor_id: 1 }  // Filter by vendor ID 1
    });

    const productsWithImages = products.map(product => {
      // If the product has an image, append the full path
      if (product.image) {
        product.image = `http://localhost:5000${product.image}`;
      }
      return product;
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});



// Update a product
router.patch("/update-product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { product_id: req.params.id },
    });
    if (!updatedProduct[0]) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { product_id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
