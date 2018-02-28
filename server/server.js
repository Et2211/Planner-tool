const express = require('express');
const app = express();
const fs = ('require');
const db = require('./ModelSQL');


app.get('/api/planner', getHeaders)
app.post('/api/planner', updateTitle);


async function updateTitle(req, res) {
  const newTitle = await db.newTitle(req.query.t)
  res.json(newTitle);
}

async function getHeaders(req, res) {
  
	const header = await db.getHeaders(req.query.title);
	res.json(header);
	}

app.listen(8080);

app.use('/', express.static('webpages', { extensions: ['html'] }));
