const express = require('express');
const app = express();
const fs = ('require');
const db = require('./ModelSQL');


app.get('/api/planner', getHeaders)
app.get('/api/planner/title', getTitle)
app.get('/api/planner/new', getPlan)
app.post('/api/planner/new', newPlan)
app.patch('/api/planner/saveData', updateData)
app.delete('/api/planner/delete', deletePlan)



async function getTitle(req, res){

  const titles = await db.getTitles()
  res.json(titles);
}

async function getHeaders(req, res) {

	const header = await db.getHeaders(req.query.title, req.query.week);
	res.json(header);
}

async function getPlan(req, res) {

	const header = await db.getPlan(req.query.title);
	res.json(header);
}


async function newPlan (req, res) {
  const name = await db.newPlan(req.query.name, req.query.weeks);
  res.json(name);
}

async function deletePlan(req, res) {
  const del = await db.deletePlan(req.query.title);
  res.json(del)
}

async function updateData(req, res) {
  const data = await db.updateData(req.query.id, req.query.data, req.query.title, req.query.week);
  res.json(data);
}



app.listen(8080);

app.use('/', express.static('webpages', { extensions: ['html'] }));
