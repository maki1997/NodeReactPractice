const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  cors = require('cors');
  port = process.env.PORT || 4000;


const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'football'
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route
