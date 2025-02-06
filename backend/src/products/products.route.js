const express = require("express");
const Product = require("./products.model");
const router = express.Router();

// ✅ Get all products
router.get("/allProducts", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// ✅ Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// ✅ Get products by brand
router.get("/brand/:brand", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { brand: req.params.brand },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this brand" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    res.status(500).json({ message: "Failed to fetch products by brand" });
  }
});

// ✅ Get products by skin type suitability
router.get("/skin-type/:skinType", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { skin_type_suitability: req.params.skinType },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this skin type" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by skin type suitability:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// ✅ Get related products by category
router.get("/related/:category", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category: req.params.category },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No related products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Failed to fetch related products" });
  }
});

module.exports = router;
