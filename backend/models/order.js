import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
    line_one: {
        type: String,
        required: true,
    },
    line_two: String,
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
});

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],
        shippingAddress: {
            type: addressSchema,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentVerdict: {
            id: { type: String },
            status: { type: String },
            updated: { type: String },
            email: { type: String },
        },
        taxAmount: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingAmount: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalOrderAmount: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paymentOn: {
            type: Date,
        },
        delivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredOn: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
