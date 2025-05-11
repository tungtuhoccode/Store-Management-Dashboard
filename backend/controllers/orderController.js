import { db } from "../config/db.js";

export const getOrders = async (req , res) => {
    try {
        const allOrders = await db`
            SELECT * FROM orders
        `; 
        res.status(200).json({
            success: true,
            data : allOrders
        });
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: error.message });
    }
}