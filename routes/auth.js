const express = require('express');
const User = require('../models/user');

const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login', 
    [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid e-mail')
        .normalizeEmail(),
    body('password', 'Please, enter a password at least 5 characters')
        .isLength({ min: 5 })
        .trim(),
    ],
    authController.postLogin
);

router.post(
    '/signup', 
    [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid e-mail')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
            .then(userDoc => {
              if (userDoc) {
                return Promise.reject(
                    'E-Mail exists already, please pick a different one.'
                    );
            }    
        })
    })
        .normalizeEmail(),
    body(
        'password',
        'Please enter a password at least 5 characters'
    )
        .isLength({ min: 5 })
        .trim(),
    body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;