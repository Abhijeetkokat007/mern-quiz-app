// import User from '../models/user.model.js';
const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt = require('jsonwebtoken');
const router = require("express").Router();

router.post("/api/auth/signup", async (req, res ) => {
    const { username, email, password, mobile } = req.body;

  

    try {
        if (
            !username ||
            !email ||
            !password ||
            username === '' ||
            email === '' ||
            password === ''
        ) {
            
           return res.status(500).json({
            success: false,
            message: "All fields are required"
        }) 
        }
        // Generate salt
        const salt = bcryptjs.genSaltSync(10);
        if (!salt) {
            throw new Error('Salt generation failed');
          }
        // Hash password
        const hashedPassword = bcryptjs.hashSync(password, salt);
        if (!hashedPassword) {
            throw new Error('Password hashing failed');
          }

        const newUser = new User({
            username,
            email,
            mobile,
            password: hashedPassword,
        });

        await newUser.save();
        res.json('Signup successful');
    } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
    }
});


router.post("/api/auth/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin },
            process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = validUser._doc;

        res


            .status(200)
            .cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error);
    }
});

router.get("/api/google", async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
});
module.exports = router;
