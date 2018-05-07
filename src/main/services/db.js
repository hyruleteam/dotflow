import { join } from 'path';

const Datastore = require('nedb');

const db = new Datastore({
  filename: `${join($dirname, '..', 'assets')}/db/data.db`,
  autoload: true,
});

export function init() {
  return db;
}
