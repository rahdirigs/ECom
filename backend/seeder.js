import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users);
        const myAdmin = createdUser[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: myAdmin };
        });

        await Product.insertMany(sampleProducts);
        console.log('Success import!!!');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Success destroyed!!!');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
