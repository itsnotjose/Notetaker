//* requiring needed packages

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
//* creating port in 3001

const PORT = process.env.PORT || 4001;

//TODO need to create app.use for public
//TODO need to add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//* GET /notes should return the notes.html file.

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
 });
//* GET * should return the index.html file.

app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '/develop/public/index.html'))
 });

//TODO GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFromFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        res.json(notes);
    });
});
//TODO POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
//* allows each note to have a unique id when it's saved

        
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
      if (title && text) {
        const notes = {
            title,
            text,
            id: uuid()
        };
        
      readAndAppend(notes, './db/db.json');
  
      const response = {
        status: 'success',
        body: notes,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });

//* starting server in PORT 3001

app.listen (PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
});