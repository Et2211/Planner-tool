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



async function updateData(id, data, title, week){

    const sql = await init();
    console.log(data[0])
    const query = sql.format('UPDATE headerNames SET ? = ? WHERE planName=? AND Week=?', [id, data, title, week])
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
