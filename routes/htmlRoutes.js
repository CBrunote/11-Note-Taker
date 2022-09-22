const path = require('path');
const router = require('express').Router();

// Route to display the index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

// Route to display the notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// Route for default page load to be the index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router