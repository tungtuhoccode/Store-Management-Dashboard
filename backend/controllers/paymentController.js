import dotenv from "dotenv"
import { db } from "../config/db.js";
import { stripe } from "../lib/stripe.js"
dotenv.config();

export const createCheckoutSession = async (req, res) => {
    try {
        //inside couponInfor should have .couponCode, .discountAmount
        const { products, couponInfor } = req.body;

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
                couponCode: couponInfor?.couponCode || null,
                products: JSON.stringify(
                    products.map((product) => ({
                        id: product.id,
                        name: product.name,
                        quantity: product.quantity,
                        price: product.price,
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

        if (session.payment_status === "paid") {
            console.log("user paid")
            if (session.metadata.couponCode) {    //make sure that user can't use the same coupon again
                await db`
                    INSERT INTO user_coupon(user_email, coupon_id)
                    VALUES
                    (
                        ${req.userEmail},
                        (SELECT id FROM coupon WHERE code = ${session.metadata.couponCode})
                    )
                `;
            }
        }

        //create user order for permanent store order history
        const products = JSON.parse(session.metadata.products);
        const sum = products.reduce((total, current) => {
            return total + ((parseFloat(current.price) * parseInt(current.quantity)))

        }, 0);
        // for user orders history
        const insertOrders = await db`
            INSERT INTO orders(user_email, total_amount, stripe_payment_id)
            VALUES
            (
                ${req.userEmail},
                ${sum},
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

    } catch (error) {
        console.log("Error inside checkoutSucessfull", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
