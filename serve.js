const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/math-grid-challenge/'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/math-grid-challenge/index.html'));
});
app.listen(80);