const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var FroalaEditor = require('./lib/froalaEditor.js');
const fs = require('fs');
// Connect To Database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => console.log(`Connected to database ${config.database}`))
  .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./routes/users');
const news = require('./routes/newsletterroutes');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/newsletter', news);


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

var filesDir = path.join(path.dirname(require.main.filename), 'uploads');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}


//upload user images in uploads folder
app.post('/upload_image', function (req, res) {
  FroalaEditor.Image.upload(req, '/uploads/', function (err, data) {

    if (err) {
      return res.send(JSON.stringify(err));
    }

    var thishost = req.protocol + '://' + req.get('host');
    console.log("thishost = " + thishost);
    var fullurl = thishost + data.link;
    console.log("fullurl = " + fullurl);
    // update the original data.link that contained only
    // the URI to the complete URL that includes hostname
    data.link = fullurl;
    console.log(data);
    res.send(data);
  });
});

