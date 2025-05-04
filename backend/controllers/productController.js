import { db } from "../config/db.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await db`
            SELECT * FROM product
        `;

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in getAllProducts ", error);
        res.status(500).json({ success: false, message: error.message });
    }

}

export const getDisplayedProduct = async (req, res) => {
    const sort = req.query.sort;
    let orderBy = "";

    if (sort === "price_asc") {
        orderBy = "price ASC";
    } else if (sort === "price_desc") {
        orderBy = "price DESC";
    }
    // will store display product inside redis for faster 
    try {
        let displayedProducts = await redis.get("displayed_product");

        //if exists in redis
        if (displayedProducts) {
            const products = JSON.parse(displayedProducts);
            if (sort === "price_asc") {
                products.sort((a, b) => a.price - b.price);
            }
            else if (sort === "price_desc") {
                products.sort((a, b) => b.price - a.price);
            }
            return res.status(200).json({ success: true, data: products });
        }

        //not exists in redis
        let query = `
            SELECT id, name, price, image, stock_quantity, categories
            FROM product
            WHERE displayed_product = True
        `;

        if (orderBy) {
            query += ` ORDER BY ${orderBy}`;
        }

        displayedProducts = await db(query);
        if (Object.keys(displayedProducts).length === 0) {
            return res.status(404).json({ success: true, message: "Current no items is being sold! Come back later!" });
        }

        await redis.set(`displayed_product`, JSON.stringify(displayedProducts))
        res.status(201).json({ success: true, data: displayedProducts });

    } catch (error) {
        console.log("Error in getDisplayedProduct ", error);
        res.status(500).json({ message: "Server error", message: error.message });
    }
}

export const toggleDisplayedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await db`
            SELECT * FROM product WHERE id=${id};
        `;
        if (findProduct.length === 0) {
            return res.status(404).json({ message: "No product found" });
        }
        const updatedProduct = await db`
            UPDATE product SET displayed_product = NOT displayed_product WHERE id = ${id} RETURNING *
        `;

        const findDisplayedProduct = await db`
            SELECT id, name, price, image, stock_quantity, categories FROM product WHERE displayed_product = TRUE;
        `;

        await redis.set("displayed_product", JSON.stringify(findDisplayedProduct));


        res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        console.log("Error inside toggleDisplayedProduct ", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getFeaturedProduct = async (req, res) => {
    try {
        let featuredProduct = await redis.get("featured_product");

        //if exists in redis
        if (featuredProduct) {
            return res.status(200).json({ success: true, data: JSON.parse(featuredProduct) });
        }

        //not exists in redis
        featuredProduct = await db`
        SELECT id, name, price, image, stock_quantity, categories FROM product WHERE slide_display = True;
    `;
        if (Object.keys(featuredProduct).length === 0) {
            return res.status(404).json({ success: true, message: "No Featured Product" });
        }

        await redis.set(`featured_product`, JSON.stringify(featuredProduct))
        res.status(201).json({ success: true, data: featuredProduct });

    } catch (error) {
        console.log("Error in getFeaturedProduct", error);
        res.status(500).json({ message: "Server error", message: error.message });
    }
}
export const toggleFeaturedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await db`
            SELECT * FROM product WHERE id=${id};
        `;
        if (findProduct.length === 0) {
            return res.status(404).json({ message: "No product found" });
        }
        const updatedProduct = await db`
            UPDATE product SET slide_display = NOT slide_display WHERE id = ${id} RETURNING *
        `;

        const findDisplayedProduct = await db`
            SELECT id, name, price, image, stock_quantity, categories FROM product WHERE displayed_product = TRUE;
        `;

        await redis.set("featured_product", JSON.stringify(findDisplayedProduct));


        res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        console.log("Error inside toggleFeaturedProduct ", error);
        res.status(500).json({ success: false, error: error.message });
    }

}

export const createNewProduct = async (req, res) => {

    try {
        const { name, price, image, stock_quantity, categories } = req.body;
        if (!name || !price || !image || !stock_quantity || !categories) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //check if user request product already existed or not
        try {
            const searchForProduct = await db`
            SELECT * FROM product WHERE name = ${name};
            `;

            if (Object.keys(searchForProduct).length > 0) {
                console.log("Product already existed")
                return res.status(409).json({ success: false, message: "Product with that name already existed!", existedProduct: searchForProduct[0] });
            }
        } catch (error) {
            console.log("Error inside createNewProduct - searchForProduct");
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }


        //upload to cloudinary
        let uploadResult;
        try {
            uploadResult = await cloudinary.uploader.upload(image, { folder: "productsImage" });
        } catch (error) {
            console.log("Error uploading image to Cloudinary ", error);
            return res.status(500).json({ success: false, message: "Image upload failed" });
        }


        const newProduct = await db`
           INSERT INTO product (name, price, image, stock_quantity, categories) VALUES (${name}, ${price}, ${uploadResult.secure_url}, ${stock_quantity}, ${categories}) RETURNING *;
        
        `;

        console.log("Success inserting ", newProduct[0]);
        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        console.log("Error in createNewProduct ", error);
        res.status(500).json({ message: "Internal Server Error ", error: error.message });
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // search to see if the product is existed
        //check if user request product already existed or not

        const searchForProduct = await db`
            SELECT * FROM product WHERE id = ${id};
            `;

        if (Object.keys(searchForProduct).length === 0) {
            console.log("No product found")
            return res.status(404).json({ success: false, message: "No Product found" });
        }
        else {
            const productId = searchForProduct[0].image.split("/").pop().split(".")[0];

            try {
                await cloudinary.uploader.destroy(`productsImage/${productId}`);
            } catch (error) {
                console.log("Error destroyning image inside cloudinary ", error);
                return res.status(500).json({ success: false, message: "Error deleting product" })
            }

            const deletedProduct = await db`
                DELETE FROM product WHERE id = ${id} RETURNING *;
            `;
            //update redis

            const findDisplayedProduct = await db`
            SELECT id, name, price, image, stock_quantity, categories FROM product WHERE displayed_product = TRUE;
            `;

            await redis.set("displayed_product", JSON.stringify(findDisplayedProduct));

            res.status(200).json({ success: true, data: deletedProduct });
        }



    } catch (error) {
        console.log("Error inside deleteProduct", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }


}

export const getCategoryProducts = async (req, res) => {
    try {
        const { category } = req.params;
        const categoryProduct = await db`
            SELECT id, name, price, image, stock_quantity, categories FROM product WHERE categories ILIKE ${category} AND displayed_product = TRUE;
        `;

        if (categoryProduct.length === 0) {
            console.log(`No displayed product found with ${category}`);
            return res.status(404).json({ success: false, message: `No Product found with ${category}` });
        }

        res.status(200).json({ success: true, data: categoryProduct });
    } catch (error) {
        console.log("Error in getCategoryProducts ", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });

    }
}

export const getProduct = async (req, res) => {


    try {
        const { id } = req.params;

        const product = await db`
            SELECT * from product WHERE id = ${id} 
        `;

        if (Object.keys(product).length === 0) { //No product found
            return res.status(404).json({ success: false, message: "No product found!" })
        }

        res.status(200).json({ success: true, data: product });


    } catch (error) {
        console.log("Error in getProduct ", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

