const path = require('path');
const express = require('express');

const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, [
        body(
            'title',
            'Use at least 3 symbols')
            .isString()
            .isLength({ min: 3 }),
        body(
            'image', 
            'Image URL should be an image'
            ),
        body(
            'price',
            'Use a numbers only in the price'
            )
            .isFloat(),
        body(
            'description', 
            'Please shorten the description'
            )
            .isLength({ max: 200 })
            .trim()
    ], 
adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body(
        'title', 
        'Use at least 3 symbols')
        .isString()
        .isLength({ min: 3 }),
    body(
        'image', 
        'Image URL should be a valid URL'
        ),
    body(
        'price',
        'Use a numbers only in the price'
        )
        .isFloat(),
    body(
        'description', 
        'Please shorten the description'
        )
        .isLength( { max: 200 } )
        .trim()
    ],
    isAuth, 
    adminController.postEditProduct
    );
 
router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
