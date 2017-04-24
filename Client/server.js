var express = require('express');
var path = require('path');
var app = express();

const PORT = process.env.PORT || 3000;

app.use(function(req,res, next) {
    if(req.headers['x-forwarded-proto'] === 'https') {
       res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname,'./public')));
// serve our static stuff like index.css
//app.use(express.static(__dirname));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,'public', 'index.html'))
})

app.listen(PORT, function() {
    console.log('Now server is ' + PORT);
});