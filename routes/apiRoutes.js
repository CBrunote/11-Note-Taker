const router = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // GET Route for a specific note
router.get('/notes/:id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No Note with that ID');
      });
  });
  
  // DELETE Route for a specific note
  router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
        console.log(result);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Note ${noteId} has been deleted 🗑️`);
      });
  });

router.post('/notes', (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
        // Variable for the object we will save
        const newNote = {
          title,
          text,
          id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`New Note added to JSON file`)
    } else {
        res.errored('Error in adding Note')
    }
});

module.exports = router;