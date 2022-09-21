const express = require('express');
const notes = require('./routes/apiRoutes')
const html = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', notes);
app.use('/', html);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);