import { join } from 'path';
import is from 'electron-is';
import { app } from 'electron';

const Datastore = require('nedb');

// filename: `${join($dirname, '..', 'assets')}/db/data.db`,
const db = {};
let normalPath = `${app.getPath('userData')}/dotflow/db`;

if (is.dev()) {
  normalPath = `${join($dirname, '..', 'dist')}/db`;
}

db.flowList = new Datastore({
  filename: `${normalPath}/flowList.db`,
});

db.projectList = new Datastore({
  filename: `${normalPath}/projectList.db`,
});

db.flowList.loadDatabase();
db.projectList.loadDatabase();

export function init() {
  return db;
}
