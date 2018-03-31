'use strict';
//global variables
const fs = require('fs');
const util = require('util');
const config = require('./config.json');
const mysql = require('mysql2/promise');
let sql;

/**
* @return {name of plans} returns all the plan names from the database
*/
async function getTitles() {
  const sql = await init();
  const query = 'SELECT planName FROM planNames'
  const [rows] = await sql.query(query);
  return rows;
}

/**
* @param {plan title, week number} returns all data for the selected plan from the database
* @return {name of plans}
*/
async function getHeaders(title, week) {
  const sql = await init();
  const query = sql.format('SELECT * FROM headerNames WHERE planName=? AND Week=?', [title, week])
  const [rows] = await sql.query(query);
  return rows;
}

/**
* @param {plan name, weeks} Inserts a new plan into the database
* @return {sql query result} Inserts a new plan into the database
*/
async function newPlan(name, weeks){

  const sql = await init()
  const query1 = sql.format('INSERT INTO planNames (planName) VALUES (?)', [name]);
  const [rows] = await sql.query(query1);

  for (let i = 1; i < weeks; i++) {
    const sql = await init()
    let query2 = sql.format('INSERT INTO headerNames (planName, Week, header1, header2, header3, main1, main2, main3) VALUES (?, "Week ' + i + '", "", "", "", "", "", "")', [name]);
    const [rows2] = await sql.query(query2)
  }
  return rows;
}

/**
* @param {name of plan} returns all fields for data with the passed plan name
* @return {plan data}
*/
async function getPlan(planName){

    const sql = await init();
    const query = sql.format('select count(*) from headerNames where planName=?', [planName])
    const [rows] = await sql.query(query);
    return rows;
}
/**
* @param {name of plan} deleles all fields with the passed planName
* @return {sql query result}
*/
async function deletePlan(planName){

    let sql = await init();
    const query1 = sql.format('DELETE FROM headerNames WHERE planName=?', [planName])
    const [rows] = await sql.query(query1);

    let sql2 = await init();
    const query2 = sql2.format('DELETE FROM planNames WHERE planName=?', [planName])
    const [rows2] = await sql2.query(query2);
    return rows;
}

/**
* @param {plan ID, updated data, plan title, week number} Updates the plan data with the attribute passed
* @return {sql query result}
*/
async function updateData(id, data, title, week){

    const sql = await init();
    const query = sql.format('UPDATE headerNames SET ' + id + '= ? WHERE planName=? AND Week=?', [data[0], title, week])
    const [rows] = await sql.query(query);
    return rows;
}


//global variable initilisation
let sqlPromise = null;

/**
* Creates a connection to the database
* @return {sqlPromise}
*/
async function init() {
  if (sqlPromise) return sqlPromise;

  sqlPromise = newConnection();
  return sqlPromise;
}

/**
* Shuts down connection to the database
* @return {sql query result}
*/
async function shutDown() {
  if (!sqlPromise) return;
  const stashed = sqlPromise;
  sqlPromise = null;
  await releaseConnection(await stashed);
}

/**
* Creates a new connection to the database
* @return {new connection}
*/
async function newConnection() {
  // todo: this should really use connection pools
  const sql = await mysql.createConnection(config.mysql);

  // handle unexpected errors by just logging them
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });
  return sql;
}

/**
* Ends connection to the database
*/
async function releaseConnection(connection) {
  await connection.end();
}

module.exports = {
  init: init,
  getHeaders:getHeaders,
  shutDown: shutDown,
  getTitles: getTitles,
  updateData: updateData,
  newPlan: newPlan,
  getPlan: getPlan,
  deletePlan: deletePlan

}
