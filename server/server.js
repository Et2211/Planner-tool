const express = require('express');
const app = express();
const fs = ('require');
const db = require('./ModelSQL');


app.get('/api/planner', getHeaders)
app.get('/api/planner/title', getTitle)



async function getTitle(req, res){

  const titles = await db.getTitles()
  res.json(titles);
}

async function getHeaders(req, res) {

	const header = await db.getHeaders(req.query.title, req.query.week);
	res.json(header);
	}





app.listen(8080);

app.use('/', express.static('webpages', { extensions: ['html'] }));
