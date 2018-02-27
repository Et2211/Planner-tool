'use strict';

const fs = require('fs');
const util = require('util');
const config = require('./config.json');
const mysql = require('mysql2/promise');
let sql;


async function newTitle(title) {
  const sql = await init();


  const insertQuery = sql.format('INSERT INTO headerNames (title) VALUES (?);', {title});
  console.log(title)

  await sql.query(insertQuery);
  //console.log("done")
}


async function getHeaders(title) {
  const sql = await init();
  const filter = '%' + title + '%';
  console.log(filter + "filter")

    await sql.query('SELECT * FROM count FROM headerNames WHERE title=?', filter);

  const [rows] = await sql.query(query);
  console.log(rows + + "rows")
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
  newTitle:newTitle,
  getHeaders:getHeaders,
  shutDown: shutDown,

}
