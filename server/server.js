'use strict';
//global variables
const express = require('express');
const app = express();
const fs = ('require');
const db = require('./ModelSQL');

//HTTP verbs
app.get('/api/planner', getHeaders)
app.get('/api/planner/title', getTitle)
app.get('/api/planner/new', getPlan)
app.post('/api/planner/new', newPlan)
app.patch('/api/planner/saveData', updateData)
app.delete('/api/planner/delete', deletePlan)


/**
* server function to get titles from the database
*/
async function getTitle(req, res){

  const titles = await db.getTitles()
  res.json(titles);
}

/**
* server function to get headers and textArea data from the database
*/
async function getHeaders(req, res) {

	const header = await db.getHeaders(req.query.title, req.query.week);
	res.json(header);
}

/**
* server function to get the number of weeks a plan has from the database
*/
async function getPlan(req, res) {

	const header = await db.getPlan(req.query.title);
	res.json(header);
}

/**
* server function to add a new plan to the database
*/
async function newPlan (req, res) {
  const name = await db.newPlan(req.query.name, req.query.weeks);
  res.json(name);
}

/**
* server function to delete the current plan from the database
*/
async function deletePlan(req, res) {
  const del = await db.deletePlan(req.query.title);
  res.json(del)
}

/**
* server function to update data to the database
*/
async function updateData(req, res) {
  const data = await db.updateData(req.query.id, req.query.data, req.query.title, req.query.week);
  res.json(data);
}


//listen on port 8080
app.listen(8080);

app.use('/', express.static('webpages', { extensions: ['html'] }));
