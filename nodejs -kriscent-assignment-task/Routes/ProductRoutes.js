const ProductRouter = require('express').Router();
const ProductController = require('../Controllers/ProductController');
const authenticateMiddleware = require('../Middlewares/autheticateMiddlware');

// Routes starts here
ProductRouter.post('/product', authenticateMiddleware, ProductController.createProduct)
ProductRouter.get('/products', authenticateMiddleware, ProductController.getAllProducts)
ProductRouter.put('/product/:id', authenticateMiddleware, ProductController.updateProduct)
ProductRouter.get('/product/:id', authenticateMiddleware, ProductController.getProduct)
ProductRouter.delete('/product/:id', authenticateMiddleware, ProductController.deleteProduct)
ProductRouter.get('/products/search', authenticateMiddleware, ProductController.searchProduct)
ProductRouter.get('/products/filter', authenticateMiddleware, ProductController.filterProductByPrice);
// Routes ends here


module.exports = ProductRouter;