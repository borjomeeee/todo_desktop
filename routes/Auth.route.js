const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// MODELS
const User = require('../models/User.model');

const router = Router();

/**
 * req = {
 *  body: { name, email, password }
 * }
 */
router.post(
    '/register',
    [
        check('name', '[REGISTER] NAME ERROR!').exists(),
        check('email', '[REGISTER] EMAIL ERROR!').normalizeEmail().isEmail(),
        check('password', '[REGISTER] PASSWORD ERROR!').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: '[REGISTER] SERVER ERROR!' });
            }

            const { name, email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: '[REGISTER] USER IS EXIST!' });
            }

            const hashPassword = await bcrypt.hash(password, 12);
            const user = new User({ date: Date.now(), name, email, password: hashPassword });

            await user.save();

            const jwtSecret = config.get('jwtSecret')
            const token = jwt.sign(
                { userId: user.id },
                jwtSecret,
                { expiresIn: '1h' }
            );

            res.status(201).json({ token, user });

        } catch (e) {
            res.status(500).json({ message: '[REGISTER] SERVER ERROR!' });
        }
    });

/**
 * req = {
 *  body: { email, password }
 * }
 */
router.post(
    '/login',
    [
        check('email', '[LOGIN] EMAIL ERROR').normalizeEmail().isEmail(),
        check('password', '[LOGIN] PASSWORD ERROR').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: '[LOGIN] SERVER ERROR!' });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: '[LOGIN] USER NOT EXIST!' })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: '[LOGIN] PASSWORD UNCORRECT!' });
            }

            const jwtSecret = config.get('jwtSecret')
            const token = jwt.sign(
                { userId: user.id },
                jwtSecret
            );

            res.status(200).json({ token, user });

        } catch (e) {
            res.status(500).json({ message: '[LOGIN] SERVER ERROR!' });
        }
    });

module.exports = router;