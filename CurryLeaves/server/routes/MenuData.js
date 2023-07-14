const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Starter = require("../models/Starter");
const Biryani = require("../models/Biryani");
const Dessert = require("../models/Dessert");


router.post('/menu', async (req, res) => {
    try {
        let StarterMenu = await Starter.find({})
        let BiryaniMenu = await Biryani.find({})
        let DessertMenu = await Dessert.find({})
        res.json({StarterMenu,BiryaniMenu,DessertMenu})
    }
    catch (error) {
        console.log(error.message)
    }
})


module.exports = router;