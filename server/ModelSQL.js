'use strict';

const fs = require('fs');
const util = require('util');
const config = require('./config');
const mysql = require('mysql2/promise');
let sql;


async function init() {
  sql = await mysql.createConnection(config.mysql);

}

async function newTitle(title) {
  const sql = await init();
  console.log("ok1")

  const insertQuery = sql.format('INSERT INTO headerNames (title) VALUES (?);', {title});
  console.log("ok2")

  await sql.query(insertQuery);
  console.log("done")
}


async function getHeaders(title) {
  const sql = await init();
  const filter = '%' + title + '%';
  console.log("ok1")
    await sql.query('SELECT * AS count FROM headerNames WHERE title = ?', [filter]);

  const [rows] = await sql.query(query);
  console.log(rows)
  return rows;


}


module.exports = {
  init: init,
  newTitle:newTitle,
  getHeaders:getHeaders


}
