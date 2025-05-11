import { db } from "../config/db.js";

export const getOrders = async (req , res) => {
    try {
        const allOrders = await db`
            SELECT
              o.id            AS order_id,
              o.order_number  As order_number,
              o.user_email  As user_email,
              o.total_amount as total_amount,
              o.create_at as create_at,
              COUNT(*)        AS item_count,
              o.fulfillment_status as fulfillment_status
            FROM orders o
            JOIN order_items oi
              ON oi.order_id = o.id
            GROUP BY o.id;
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
