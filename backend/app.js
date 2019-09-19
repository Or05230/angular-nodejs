const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const postsRouting = require('./routes/posts')
const app = express();


mongoose.connect("mongodb+srv://orahl1:" + process.env.MONGO_DB_PW + "@cluster1-6vh27.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true})
.then (() => {
  console.log('coonected to DB!')
})
.catch((err) => {
  console.log(err) //work
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use("/posts", postsRouting);

module.exports = app;
