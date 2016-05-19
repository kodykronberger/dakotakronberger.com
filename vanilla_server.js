/*
    Creates a server, that serves up local static files.
    Created by: Dakota Kronberger
*/

var http = require('http');
var fs = require('fs');
var url = require('url');

var express = require("express");
var app = express();

http.createServer(function (request, response) {
    // Parse the pathname requested.
    var pathname = url.parse(request.url).pathname;
    
    // If no pth was requested, direct back to home page.
    if(pathname == "" || pathname == "/"){
        fs.readFile("www/index.html", function (error, data) {
            response.write(data.toString());
            response.end();
        });
    } else {
        // Try to grab the file from the path specified.
        fs.readFile("www" + pathname, function (error, data) {
            
            
            if (error) {
                // 404: File not found.
                response.writeHead(404, contentType);
                response.write("404: Not found");
            } else {
                // 200: File was found.
                var contentType = null;
            
                if (pathname.indexOf(".css") > -1) {
                    contentType = { 'Content-Type': 'text/css' };
                } else if (pathname.indexOf(".html") > -1) {
                    contentType = { 'Content-Type': 'text/html' };
                } else if (pathname.indexOf(".png") > -1) {
                    contentType = { 'Content-Type': 'image/png' };
                } else if (pathname.indexOf(".jpg") > -1) {
                    contentType = { 'Content-Type': 'image/jpg' };
                    console.log(pathname);
                }
                
                response.writeHead(200, contentType);
                response.write(data.toString());
            }
            // End response.
            response.end();
        });
    }
}).listen(process.env.PORT || 5000);

console.log('Server started! ' + new Date().toTimeString());