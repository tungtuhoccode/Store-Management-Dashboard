import { db } from "../config/db.js";
import { validate as isUuid, validate } from "uuid";


// GET api/order
export const getSingleOrder = async (req , res) => {
    const { id } = req.params;
    const isAdmin = req.userRole == "admin"
    const userEmail = req.userEmail;

    //id must be an uuid 
    //uuid check to prevent error 
    if (!isUuid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order id format" });
    }

    try {
        const [order] = await db`
          SELECT
            o.id, o.user_email, o.total_amount, o.stripe_payment_id, o.create_at, o.order_number,
            o.fulfillment_status,
            json_agg(
              json_build_object(
                'product_id',    p.id,
                'name',          p.name,
                'price',         p.price,
                'image',         p.image,
                'quantity',      oi.quantity,
                'stock_quantity',p.stock_quantity,
                'categories',    p.categories
              )
            ) AS items
          FROM orders o JOIN order_items oi ON oi.order_id = o.id
          JOIN product p
            ON p.id = oi.product_id
          WHERE o.id = ${id}
          GROUP BY
            o.id,
            o.user_email,
            o.total_amount,
            o.stripe_payment_id,
            o.create_at,
            o.order_number,
            o.fulfillment_status;
        `; 

        //order not found
        if (!order) {
          return res.status(404).json({ success: false, message: "Order not found" });
        }

        console.log(order.user_email)
        //if order found 
        //if admin, then return any 
        if (isAdmin) {
          return res.status(200).json({
            success: true,
            data : order
          });
        }

        //if regular user, do a check before return 
        if (userEmail != order.user_email){
          return res.status(404).json({ success: false, message: "Can't find your order with this id" });
        }

        return res.status(200).json({
            success: true,
            data : order
        });
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
}

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
            JOIN order_items oi ON oi.order_id = o.id GROUP BY o.id;
        `; 
        res.status(200).json({
            success: true,
            data : allOrders
        });
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
}

