'use strict';

const fs = require('fs');
const util = require('util');
const config = require('./config.json');
const mysql = require('mysql2/promise');
let sql;


async function newTitle(title) {

  let temp = getOldTitle(1)

  const sql = await init();
  const insertQuery = sql.format('UPDATE headerNames SET title=? WHERE title=?', [title, temp]);


  await sql.query(insertQuery);
  console.log("title1 = " + title)
}


  async function getOldTitle(id) {
    let tester = '%' + id + '%'
    const sql = await init();
    const query = sql.format('SELECT title FROM headerNames WHERE id=?', [tester]);
    const [rows] = await sql.query(query);
  return rows;
  }



async function getHeaders(title) {
  const sql = await init();
  const filter = '%' + title + '%';
  console.log(filter)

    await sql.query('SELECT * FROM headerNames WHERE title=?', {filter});
    //sql format
  const [rows] = await sql.query(query);
  console.log(rows + "rows")
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
