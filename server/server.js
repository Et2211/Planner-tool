const express = require('express');
const app = express();
const fs = ('require');
const db = require('./ModelSQL.js');

app.put('/api/planner', updateTitle);

async function updateTitle(req, res) {
  const newTitle = await db.newTitle(req.query.t)
  res.json(newTitle);
}



app.listen(8080);

app.use('/', express.static('webpages', { extensions: ['html'] }));
