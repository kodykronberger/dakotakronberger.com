/*
    Creates a server, that serves up local static files.
    Created by: Dakota Kronberger
*/
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('www'));
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));  

app.post('/contact', function(req, res) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport();
    
    // Setup mail
    transporter.sendMail({
       from: 'contact@dakotakronberger.com',
       to: 'contact@dakotakronberger.com',
       subject: 'New message from: ' + req.body.name + " at " + req.body.email,
       html: "<h2>From: "+req.body.name+", "+req.body.email+"</h2><br><p style='margin-left: 20px;'>"+req.body.message+"</p>"
    }, function(error, info) {
        if(error){
            return console.log(error);
        }
        console.log('Contact form was submitted, from ' + req.body.name+", "+req.body.email + " at " + new Date().toTimeString());
    });
    
    // Close connection for optimization
    transporter.close();
    res.end();
});

app.use(function(req, res, next) {
  res.status(404).send('404: Sorry! I cannot be found...');
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Server started! ' + new Date().toTimeString());
});





