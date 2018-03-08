const express = require('express');
const app = express();
const fs = ('require');
const db = require('./ModelSQL');


app.get('/api/planner', getHeaders)
app.get('/api/planner/title', getTitle)
app.post('/api/planner/new', newPlan)
app.patch('/api/planner/saveData', updateData)



async function getTitle(req, res){

  const titles = await db.getTitles()
  res.json(titles);
}

async function getHeaders(req, res) {

	const header = await db.getHeaders(req.query.title, req.query.week);
	res.json(header);
}

async function newPlan (req, res) {
  const name = await db.newPlan(req.query.name);
  res.json(name);

}

async function updateData(req, res) {
  const data = await db.updateData(req.query.id, req.query.data, req.query.title, req.query.week);
  res.json(data);
}



app.listen(8080);

app.use('/', express.static('webpages', { extensions: ['html'] }));
