const router = require('express').Router();

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
});