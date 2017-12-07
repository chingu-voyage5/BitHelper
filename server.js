const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const router = express.Router();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve('build')));

// will add api routing here


// If request doesn't match api request always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

app.listen(port, function() {
 console.log(`app running on port ${port}`);
});
