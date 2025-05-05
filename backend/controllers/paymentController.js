import dotenv from "dotenv"
import { db } from "../config/db.js";
import { stripe } from "../lib/stripe.js"
dotenv.config();

export const createCheckoutSession = async (req, res) => {
    try {
        //inside couponInfor should have .couponCode, .discountAmount
        const { couponInfor } = req.body;
        const products = await db`
            SELECT product.id, product.name, product.price, product.image, cart_item.quantity FROM product JOIN cart_item ON product.id = cart_item.product_id JOIN cart ON cart_item.cart_id = cart.id WHERE cart.user_email = ${req.userEmail}

        `;
        let totalAmount = 0;
        const lineItems = products.map((product) => {
            const amount = Math.round(product.price * 100); //stripe recieve in cents
            totalAmount += amount * product.quantity;

            return {
                price_data: {
                    currency: "cad",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount
                },
                quantity: product.quantity || 1
            }
        });

        if (couponInfor) {
            totalAmount -= Math.round(totalAmount * couponInfor.discountAmount / 100);
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card",],
            line_items: lineItems,
            mode: "payment",
            automatic_tax: { enabled: true },
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: couponInfor ?
                [
                    {
                        coupon: (await stripe.coupons.create({
                            percent_off: couponInfor.discountAmount,
                            duration: "once"
                        })).id
                    }
                ]
                :
                [],
            metadata: {
                userEmail: req.userEmail,
                couponCode: couponInfor ? JSON.stringify(couponInfor) : null,
                products: JSON.stringify(
                    products.map((product) => ({
                        id: product.id,
                        price: product.price,
                        quantity: product.quantity
                    }))
                )
            }
        });

        res.status(200).json({ success: true, url: session.url, totalAmount: totalAmount / 100 });

    } catch (error) {
        console.log("Error inside createCheckoutSession", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const checkoutSuccessfull = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const couponCode = session?.metadata?.couponCode
            ? JSON.parse(session.metadata.couponCode)
            : null;



        if (session.payment_status === "paid") {
            console.log("user paid")
            if (couponCode) {
                await db`
                INSERT INTO user_coupon(user_email, coupon_id)
                VALUES
                (
                    ${req.userEmail},
                    (SELECT id FROM coupon WHERE code = ${couponCode.couponCode})
                )
            `;
            }
            //create user order for permanent store order history
            let products = JSON.parse(session.metadata.products);

            let subtotal = products.reduce((total, current) => {
                return total + (parseFloat(current.price) * parseInt(current.quantity));
            }, 0);

            // Discount: % off from metadata
            const discountPercentage = parseFloat(couponCode?.discountAmount) || 0;
            const discountValue = subtotal * (discountPercentage / 100);

            // Tax from Stripe (in cents → dollars)
            const taxAmount = (session.total_details?.amount_tax || 0) / 100;

            // Final total
            const total = (subtotal - discountValue) + taxAmount;

            // for user orders history
            const insertOrders = await db`
                INSERT INTO orders(user_email, total_amount, stripe_payment_id)
                VALUES
                (
                    ${req.userEmail},
                    ${total},
                    ${sessionId}
                )
                RETURNING *
                `;

            for (const product of products) {
                await db`
                    INSERT INTO order_items(order_id, product_id, quantity, price)
                    VALUES (
                    ${insertOrders[0].id},
                    ${product.id},
                    ${product.quantity},
                    ${product.price}
                    )
                `;
            }
            // Delte existing cart items
            await db`
                DELETE FROM cart_item
                WHERE cart_id = 
                (SELECT id FROM cart WHERE user_email = ${req.userEmail});
                `;
            res.status(200).json({ success: true, message: "Purchase completed successfully." })

        }
    } catch (error) {
        console.log("Error inside checkoutSucessfull", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
