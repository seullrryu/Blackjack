// app.js
const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); //body parser 


app.listen(3000);
