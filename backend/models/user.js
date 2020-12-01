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

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        addresses: [addressSchema],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;
