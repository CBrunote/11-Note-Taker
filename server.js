const express = require('express');
const fs = require('fs');

const notes = require('./routes/apiRoutes')
const html = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.listen(PORT, () =>
    console.log(`App listening at https://localhost:${PORT}`)
);