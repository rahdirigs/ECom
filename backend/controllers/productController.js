import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';

// @desc: Fetch products
// @route: Get /api/products
// @access: public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc: Fetch product
// @route: Get /api/products/:id
// @access: public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc: Create product
// @route: POST /api/products
// @access: private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Product Sample Name',
        price: 0,
        curPrice: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
        usedFor: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc: Update product
// @route: PUT /api/products/:id
// @access: private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        curPrice,
        description,
        image,
        brand,
        category,
        countInStock,
        usedFor,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.curPrice = curPrice;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.usedFor = usedFor;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProductById, getProducts, createProduct, updateProduct };
