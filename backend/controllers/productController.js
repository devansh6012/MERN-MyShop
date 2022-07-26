import e from 'express';
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all products
// Get /api/products
// access: Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products);
})

// Fetch single product
// Get /api/products/:id
// access: Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// Delete product
// DELETE /api/products/:id
// access: Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if(product){
        await product.remove()
        res.json({message: 'Product removed'})
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
    
})

// Create product
// POST /api/products
// access: Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})


// Update product
// PUT /api/products/:id
// access: Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, imaage, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.imaage = imaage
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else{
        res.status(404)
        throw new Error('Product not found')
    }

    
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }