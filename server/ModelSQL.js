'use strict';

const fs = require('fs');
const util = require('util');
const config = require('./config');
const mysql = require('mysql2/promise');
let sql;


async function init() {
  sql = await mysql.createConnection(config.mysql);
}

async function showAll(table) {
  const query = 'SELECT * FROM ' + table;
  const formattedQuery = sql.format(query);
  const rows = await sql.query(formattedQuery);
  return rows[0];
}


module.exports = {
  init: init,
  showAll: showAll
}
