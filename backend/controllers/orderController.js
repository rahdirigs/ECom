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

// @desc: Get order by ID
// @route: GET /api/order/:id
// @access: private
const getOrderbyId = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc: Update order to paid
// @route: GET /api/order/:id/pay
// @access: private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paymentOn = Date.now();
        order.paymentVerdict = {
            id: req.body.id,
            status: req.body.status,
            updated: req.body.update_time,
            email: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc: Get order list
// @route: GET /api/orders/myorders
// @access: private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
});

export { addOrderItems, getOrderbyId, updateOrderToPaid, getMyOrders };
