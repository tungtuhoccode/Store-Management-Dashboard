import { db } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();




export const getCartProduct = async (req, res) => {
    try {
        const cartItems = await db`
            SELECT product.id, product.name, product.price, product.image, product.categories, cart_item.quantity
            FROM product
            JOIN cart_item ON cart_item.product_id = product.id
            JOIN cart ON cart_item.cart_id = cart.id
            JOIN active_user on cart.user_email = active_user.email
            WHERE active_user.email = ${req.userEmail}
        `;
        if (cartItems.length === 0) {
            return res.status(404).json({ success: true, message: "Cart is empty" });
        }
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.log("Error inside getCartProduct ", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }

}
export const addToCart = async (req, res) => {

    try {
        const { productId } = req.body;
        const { userEmail } = req;
        const productAdded = await db`
            INSERT INTO cart_item (cart_id, product_id, quantity)
            VALUES (
                (SELECT id FROM cart WHERE user_email = ${userEmail}),
                ${productId},
                1
            )
            ON CONFLICT (cart_id, product_id)
            DO UPDATE SET quantity = cart_item.quantity + EXCLUDED.quantity
            RETURNING *
        `;
        res.status(201).json({ success: true, data: productAdded });

    } catch (error) {
        console.log("Error in addToCart ", error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteCartProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const { userEmail } = req;

        const productDeleted = await db`
            DELETE FROM cart_item WHERE 
            cart_id = (SELECT id FROM cart WHERE user_email = ${userEmail})
            AND
            product_id = ${productId}
            RETURNING *
        `;
        res.status(200).json({ success: true, data: productDeleted });
    } catch (error) {
        console.log("Error in deleteCartProduct ", error);
        res.status(500).json({ success: false, message: error.message });
    }


}

export const updateQuantity = async (req, res) => {
    try {
        const { updates } = req.body;
        const results = [];
        for (const { productId, updateQuantity } of updates) {
            if (updateQuantity <= 0) {
                try {
                    const productDeleted = await db`
                        DELETE FROM cart_item WHERE 
                        cart_id = (SELECT id FROM cart WHERE user_email = ${req.userEmail})
                        AND
                        product_id = ${productId}
                        RETURNING *
                    `;
                    results.push({ productId, action: "deleted", data: productDeleted })
                } catch (error) {
                    console.log("Error in updateQuantity trying to delete the product ", error);
                    return res.status(500).json({ success: false, message: error.message });
                }
            } else {
                const updateResult = await db`
                UPDATE cart_item 
                SET quantity = ${updateQuantity}
                WHERE product_id = ${productId}
                AND cart_id = (SELECT id FROM cart WHERE user_email = ${req.userEmail})
                RETURNING *;
                `;
                results.push({productId, action: "updated", data: updateResult});
            }
        }

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.log("Error in updateQuantity ", error);
        res.status(500).json({ success: false, message: error.message });

    }
}