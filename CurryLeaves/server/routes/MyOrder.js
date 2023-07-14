const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require('../models/Orders')


router.post('/order', async (req, res) => {
    let data = req.body.order_data;
    let date = req.body.order_date + " at " + req.body.order_time
    await data.splice(0, 0, { Order_date: date, Total_price: req.body.total_price })
    let eId = await Order.findOne({ 'email': req.body.email })
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myorder', async (req, res) => {
    try {
        let eId = await Order.findOne({ 'email': req.body.email })
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error", error.message)
    }
})


module.exports = router;