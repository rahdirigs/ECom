import Order from '../models/order.js';
import asyncHandler from 'express-async-handler';

// @desc: Create an order
// @route: POST /api/order
// @access: private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No items found in the order');
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const newOrder = await order.save();

        res.status(201).json(newOrder);
    }
});

export { addOrderItems };
