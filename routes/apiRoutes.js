const router = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid');

// GET route for all the notes in the DB.json file.
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// GET Route for a specific note
router.get('/notes/:id', (req, res) => {
    // create variable for the id of the note
    const noteId = req.params.id;
    // Helper function to read the json file.
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Filter out the note with the ID you want from the Array.
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No Note with that ID');
      });
  });
  
// DELETE Route for a specific note
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  //helper function to read the current contents of the db.json file and parse the json
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

// Post request for adding a note to the DB.
router.post('/notes', (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
        // Variable for new note we want to save with a random id from UUID.
        const newNote = {
          title,
          text,
          id: uuidv4(),
        };
        // use our helper function to read the new note and add it to the DB.
        readAndAppend(newNote, './db/db.json');
        res.json(`New Note added to JSON file`)
    } else {
        res.errored('Error in adding Note')
    }
});

module.exports = router;