import { db } from "../config/db.js";

export const applyCoupon = async (req, res) => {
    try {

        const { couponCode } = req.body;
        const { userEmail } = req;
        const couponInfor = await db`
            SELECT * FROM coupon  WHERE code = ${couponCode} AND expire_date > NOW()
        `;
        if (couponInfor.length === 0) { //no coupon code exist
            return res.status(404).json({ success: false, message: "Coupon doesn't exist!" })
        }
        const checkIfUserUsedCoupon = await db`
            SELECT 1 FROM user_coupon WHERE user_email = ${userEmail} 
            AND coupon_id = ${couponInfor[0].id};
            
        `;
        if (checkIfUserUsedCoupon.length > 0) { //user already used that coupon before
            return res.status(409).json({ success: false, message: "Coupon already used before!" })
        }
        // else coupon exists and user never used it
        const response = await db`
            SELECT p.price, ci.quantity
            FROM product p
            JOIN cart_item ci ON p.id = ci.product_id
            JOIN cart c ON ci.cart_id = c.id
            WHERE c.user_email = ${userEmail};
        `;
        const sum = response.reduce((total, current) => {
            return total + ((parseFloat(current.price) * parseInt(current.quantity)))

        }, 0);
        
        res.status(200).json({
            success: true,
            oldPrice: sum.toFixed(2),
            discountAmount: couponInfor[0].discount_percentage,
            newPrice: parseFloat(
                (sum - (sum * couponInfor[0].discount_percentage / 100))
            ).toFixed(2)
        });


    } catch (error) {
        console.log("Error inside applyCoupon ", error);
        res.status(500).json({ success: false, message: error.message });
    }
}