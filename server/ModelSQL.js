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


async function getHeaders(title) {
  const sql = await init();
  const filter = '%' + title + '%';

    const query = sql.format('SELECT * FROM headerNames WHERE title=?', [title])

    //sql format
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
  getTitles: getTitles

}
