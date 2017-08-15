const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const config = require('config')

//Routes
const customer = require('./routes/customer');
const vendor = require('./routes/vendor');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static(path.join(__dirname, 'static')))


app.get("/", function(req, res, next){
  res.render("index", {appType:"Express"})
})

app.use('/api/customer', customer);
app.use('/api/vendor', vendor);

app.listen(3000, function(){
  console.log("App running on port 3000")
})
