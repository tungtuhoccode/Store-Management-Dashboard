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

const getOrdersDetails = async () => {
    try {
        const allOrders = await db`
           SELECT
  o.id,
  o.user_email,
  o.total_amount,
  o.stripe_payment_id,
  o.create_at,
  COALESCE(
    json_agg(
      json_build_object(
        'order_item_id',  oi.id,
        'product_id',     p.id,
        'name',           p.name,
        'price',          p.price,
        'quantity',       oi.quantity,
        'image',          p.image,
        'categories',     p.categories
      )
    ) FILTER (WHERE oi.id IS NOT NULL),
    '[]'
  ) AS items
FROM orders o
LEFT JOIN order_items oi
  ON oi.order_id = o.id
LEFT JOIN product p
  ON p.id = oi.product_id
GROUP BY
  o.id,
  o.user_email,
  o.total_amount,
  o.stripe_payment_id,
  o.create_at
ORDER BY
  o.create_at DESC;
        `; 
        console.log(allOrders)
    }
    catch(err) {
        console.log(err)
    }
}


const getOrdersDetails2 = async () => {
    try {
        const allOrders = await db`
    SELECT product.id, product.name, product.price, product.image, cart_item.quantity FROM product JOIN cart_item ON product.id = cart_item.product_id JOIN cart ON cart_item.cart_id = cart.id WHERE cart.user_email = 'test2@gmail.com'
        `; 
        console.log(allOrders)
    }
    catch(err) {
        console.log(err)
    }
}
getOrdersDetails()
