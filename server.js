const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('get request');
});

app.post('/', (req, res) => {
  console.log(req.body);
});

app.listen(PORT, (err) =>
  console.log(`${err ? err : 'Running on port 3030'}`),
);