const express = require("express");
const mongoose = require('mongoose');

const logRoutes = require('./routes/logs/log');


const app = express();


const mongooseConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  } 
  //  use "mongod --bind_ip_all" in other system 
  // 127.0.0.1  
  // 192.168.0.125/24 
  // iptables -A INPUT -s 192.168.0.125 -p tcp --destination-port 27017 -m state --state NEW,ESTABLISHED -j ACCEPT
  mongoose.connect('mongodb://127.0.0.1:27017/'+ 'log-viewer2', mongooseConnectOptions)
  // mongoose.connect('mongodb://192.168.0.125:27017/'+ 'log-viewer2', mongooseConnectOptions)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(err => {
    console.log("Connection failed!");
     console.log(err);
  });
  mongoose.connection.on('error', err => {
    console.log(err);
  })
  
  
  
  mongoose.connection
  .on('open', res => {
    console.log('log-veiwer connection has been made...');
  
  })
  .on('error', err => {
    console.log(err);
  });
  
  
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({extended: true} ));
  
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  
    next();
  
  });
app.get('',(req,res,next)=>{
  
    console.log("heloo express server");
    res.send("helloo express");

})

app.use('/api/logs',logRoutes)
module.exports = app;