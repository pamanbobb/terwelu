var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Insta = require('@androz2091/insta.js');
var client = new Insta.Client();
var customers = [];
app.use(express.static(path.join(__dirname, 'public')));
app.post('/login', urlencodedParser, (req, res) => {
    client.login(req.body.username, req.body.sandine);
    client.on('connected', () => {
        client.fetchUser(req.body.username).then((user) => {
            var customer = {};
            customer.status = 'Connected';
            customer.bio = user.biography;
            customer.post = user.mediaCount;
            customer.followers = user.followerCount;
            customer.following = user.followingCount;
            customer.namalengkap = user.fullName;
            customer.namauser = user.username;
            customer.uid = user.id;
            customers.push(customer);
            return res.send(customer);
        });
    })
})

app.post('/followuid', urlencodedParser, (req, res) => {
    client.fetchUser(req.body.uid).then((user) => {
        var array_follow = {};
        array_follow.status = 'Connected';
        customers.push(array_follow);
        res.send(array_follow);
        user.follow();
    });
})

app.post('/metu', (request, response) =>{
    var array_json = {};
    array_json.status = 'Connected';
    customers.push(array_json);
    response.send(array_json);
    client.logout();
});

app.use('/', router);
const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});