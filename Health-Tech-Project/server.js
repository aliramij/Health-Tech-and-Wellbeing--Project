const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// path where user data will be stored
const dataFile = path.join(__dirname, 'users.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.post('/login', (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).send('username and email required');
  }

  let users = [];
  if (fs.existsSync(dataFile)) {
    try {
      users = JSON.parse(fs.readFileSync(dataFile, 'utf-8')) || [];
    } catch (err) {
      console.error('read error', err);
    }
  }

  users.push({ username, email, timestamp: new Date().toISOString() });

  try {
    fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('write error', err);
  }

  res.redirect('index.html');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
