const express = require('express')
const mongoDB = require('./databse')
const cors = require('cors');
const app = express()
const port = 5000
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors());
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/menu', require('./routes/MenuData'));
app.use('/api/order', require('./routes/MyOrder'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})