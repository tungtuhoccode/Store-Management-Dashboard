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
router.get("/:id", getProduct);




export default router;