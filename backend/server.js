const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let entries = [];
app.use(bodyParser.json());

app.use(express.static('frontend'));

app.get('/entries', (req, res) => {
    res.json(entries);
});

app.post('/entries', (req, res) => {
    const newEntry = req.body;
    if (newEntry && newEntry.text) {
        entries.push(newEntry);
        res.status(201).json(newEntry);
    } else {
        res.status(400).json({ error: 'Invalid entry' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});