const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtSecret = "HaHa";
const { body, validationResult } = require("express-validator");

router.post(
    "/signup",
    [body("password").isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        let isNewUser = true;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, isNewUser, errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(9);
        let encryptpass = await bcrypt.hash(req.body.password, salt);
        let Address = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
        };
        let NewUser = await User.findOne({ email: req.body.email });
        if (NewUser) {
            isNewUser = false;
            res.json({ success, isNewUser });
        } else {
            try {
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: encryptpass,
                    address: Address,
                })
                    .then((user) => {
                        const data = {
                            id: user.id,
                        };
                        const authToken = jwt.sign(data, jwtSecret);
                        success = true;
                        console.log("Added");
                        res.json({ success, authToken, isNewUser });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({ error: "Please enter a unique value." });
                    });
            } catch (error) {
                console.log(error.message);
            }
        }
    }
);
router.post('/login', [
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.json(success)
        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            res.json(success)
        }
        else {
            const data = {
                user: {
                    id: user.id
                }
            }
            let userName = user.name
            let userEmail = req.body.email
            success = true
            const authToken = jwt.sign(data, jwtSecret)
            res.json({ success, userName, userEmail, authToken })
        }
    }
    catch (error) {
        console.log(error.message)
    }
});

module.exports = router;
