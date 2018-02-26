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

async function getHeaders(req, res){
	const stories = await db.getHeaders(req.query.id);
	res.json(stories);
	}

app.listen(8080);

app.use('/', express.static('webpages', { extensions: ['html'] }));
