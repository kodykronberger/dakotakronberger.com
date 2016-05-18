/*
    Creates a server, that serves up local static files.
    Created by: Dakota Kronberger
*/

var http = require('http');
var fs = require('fs');
var url = require('url');

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
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write("404: Not found");
            } else {
                // 200: File was found.
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data.toString());
            }
            // End response.
            response.end();
        });
    }
}).listen(process.env.PORT || 5000);

console.log('Server started! ' + new Date().toTimeString());