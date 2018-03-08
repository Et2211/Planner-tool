'use strict';

const fs = require('fs');
const util = require('util');
const config = require('./config.json');
const mysql = require('mysql2/promise');
let sql;


async function getTitles() {
  const sql = await init();
  const query = 'SELECT planName FROM planNames'
  const [rows] = await sql.query(query);
  return rows;
}


async function getHeaders(title, week) {
  const sql = await init();
  const filter1 = '%' + title + '%';
  const filter2 = '%' + week + '%';
  const query = sql.format('SELECT * FROM headerNames WHERE planName=? AND Week=?', [title, week])
  const [rows] = await sql.query(query);
  return rows;
}


async function newPlan(name){

  const sql = await init()
  const query1 = sql.format('INSERT INTO planNames (planName) VALUES (?)', [name]);
    console.log(query1)
  const rows = await sql.query(query1);

  for (i = 1; i < 13; i++) {
  //  const sql = await init()
    let query2 = sql.format('INSERT INTO headerNames (planName, Week) VALUES (?, "Week" ' + i + ')';, [name]);

    console.log(query2)
    const rows2 = await sql.query(query2)
  }

}


async function updateData(id, data, title, week){

    const sql = await init();

    const query = sql.format('UPDATE headerNames SET ' + id + '= ? WHERE planName=? AND Week=?', [data[0], title, week])
    console.log(query);
    const [rows] = await sql.query(query);
    return rows;
}

let sqlPromise = null;


async function init() {
  if (sqlPromise) return sqlPromise;

  sqlPromise = newConnection();
  return sqlPromise;
}

async function shutDown() {
  if (!sqlPromise) return;
  const stashed = sqlPromise;
  sqlPromise = null;
  await releaseConnection(await stashed);
}

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

async function releaseConnection(connection) {
  await connection.end();
}


module.exports = {
  init: init,

  getHeaders:getHeaders,
  shutDown: shutDown,
  getTitles: getTitles,
  updateData: updateData

}
