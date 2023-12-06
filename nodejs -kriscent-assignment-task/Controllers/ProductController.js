const Product = require("../Models/ProductModel");

const productController = {
    createProduct: async (req, res) => {
        const { id, isAdmin } = req.user;
        const { name, price, description } = req.body;
        try {

            // Role Based Routing
            if (!isAdmin) {
                return res.status(401).json({ message: 'You are not authorized to create product', isSuccess: false });
            }
            // Making of new product with Product model
            const newProduct = new Product({
                name,
                price,
                description,
                user: id
            });
            // saving the newly created product in database
            await newProduct.save();
            res.status(201).json({ message: 'Product Created Successfully', isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    getAllProducts: async (req, res) => {
        const { id } = req.user;
        try {
            // getting all the products from the database of the user who is logged in by using the user id
            const products = await Product.find({ user: id });
            res.status(200).json({ products, isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, price, description } = req.body;
        try {
            // checking if the product exists in the database
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product Not Found', isSuccess: false });
            }
            // updating the product in the database
            await Product.findByIdAndUpdate(id, { name, price, description });
            res.status(200).json({ message: 'Product Updated Successfully', isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            // checking if the product exists in the database
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product Not Found', isSuccess: false });
            }
            // deleting the product from the database
            await Product.findByIdAndDelete(id);
            res.status(200).json({ message: 'Product Deleted Successfully', isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    getProduct: async (req, res) => {
        const { id } = req.params;
        try {
            // checking if the product exists in the database
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product Not Found', isSuccess: false });
            }
            // sending the product to the client
            res.status(200).json({ product, isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    searchProduct: async (req, res) => {
        const { keyword } = req.query;
        try {
            // searching for products based on the keyword
            const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
            res.status(200).json({ products, isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    },
    filterProductByPrice: async (req, res) => {
        const { minPrice, maxPrice } = req.query;
        try {
            // filtering products based on price range
            const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
            res.status(200).json({ products, isSuccess: true });
        }
        catch (error) {
            // sending the error message to the client (if any)
            res.status(500).json({ message: error.message, isSuccess: false });
        }
    }
};

module.exports = productController;