// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// configuration =================
const config = {
    useUnifiedTopology: true,
    autoIndex: false,
    useNewUrlParser: true
};

var Person = mongoose.model('Person', {
    name: { type: String },
    email: { type: String },
    message: { type: String },
}, "person");

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

mongoose.connect('mongodb://localhost:27017/my-todo', config).then(() => console.log('connecting to database successful'))
    .catch(err => console.error('could not connect to mongo DB', err)); // connect to mongoDB database 

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// routes ======================================================================

// api ---------------------------------------------------------------------

// get all people
app.get('/api/person', function(req, res) {

    // use mongoose to get all todos in the database
    Person.find(function(err, person) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(person); // return all people in JSON format
    });
});


// create person and send back all persons after creation
app.post('/api/person', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Person.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        done: false
    }, function(err) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Person.find(function(err, person) {
            if (err)
                res.send(err)
            res.json(person);
        });
    });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove(req.params.todo_id, function(err, todos) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

//delete a person
app.delete('/api/person/:person_id', function(req, res) {
    Person.findByIdAndDelete({ _id: mongoose.Types.ObjectId(req.params.person_id) }, function(err) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Person.find(function(err, person) {
            if (err)
                res.send(err)
            res.json(person);
        });
    });

});