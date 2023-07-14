const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://<name>:<password>@cluster0.5bpoyoy.mongodb.net/?retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI,{ useNewUrlParser: true })
        console.log("Databese Connected")
    }
    catch (error) {
        console.log(error)
    };
}

module.exports = mongoDB;