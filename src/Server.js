var express = require('express');
var app = express();

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

app.use(express.static(__dirname + "/../frontend"));

app.get('/calendar/events/:id', function (request, response) {
    console.log ("GET method not implemented");
    response.send("GET method for path");
});

app.get('/calendar/upcomingEvents', function (request, response) {
    console.log ("GET method not implemented");
    response.send("GET method for path");
});


app.put('/calendar/events/:id', function (request, response) {
    console.log ("PUT method not implemented");
});

app.post('/calendar/events/:id', function (request, response) {
    console.log ("POST method not implemented");
});

app.delete('/calendar/events/:id', function (request, response) {
    console.log ("DELETE method not implemented");
});
