import express from "express"
import { getAllProducts, getProduct, getDisplayedProduct, createNewProduct, deleteProduct, getCategoryProducts, toggleDisplayedProduct, getFeaturedProduct, toggleFeaturedProduct } from "../controllers/productController.js"
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js"

const router = express.Router();



router.get("/displayedProduct", getDisplayedProduct);
router.patch("/displayProduct/:id", protectRoute, adminRoute, toggleDisplayedProduct);
router.get("/featuredProduct", getFeaturedProduct);
router.patch("/featuredProduct/:id", protectRoute, adminRoute, toggleFeaturedProduct);

router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/category/:category", getCategoryProducts);

router.get("/", protectRoute, adminRoute, getAllProducts);
router.post("/", protectRoute, adminRoute, createNewProduct);
router.post("/bulk", protectRoute, adminRoute, async (req, res) => {
    try {
        const products = req.body.products;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "No products provided" });
        }
        // Assuming you have a Product model
        const createdProducts = await Promise.all(
            products.map(productData => createNewProduct({ body: productData }, { json: () => {} }))
        );
        res.status(201).json({ message: "Products created", products: createdProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", getProduct);




export default router;