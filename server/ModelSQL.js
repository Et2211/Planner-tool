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
  const insertQuery =
    sql.format('UPDATE headerNames SET title = ? ; ',
               {title});
  await sql.query(insertQuery);
}



module.exports = {
  init: init,
  showAll: showAll
}
