import flowlist from './initData/flowlist';

const { remote } = window.require('electron');
const { dbstore } = remote.getGlobal('services');

const data = {
  avatar: 'G',
  name: '新增数据---',
  description: '这是切图必备生成器，给你带来飞一般的切图体验',
  type: 'git',
  isDefault: 1,
  actions: [
    1,
  ],
}

export function fetchOriginData() {
  return flowlist;
}

export function addData() {
  return new Promise((resolve, reject) => {
    dbstore.flowList.insert(data, (err, newDoc) => {
      if (err) reject(err);
      resolve(newDoc);
    });
  });
}

export function fetch() {
  return new Promise((resolve, reject) => {
    dbstore.flowList.find({}, (err, newDoc) => {
      if (err) reject(err);
      resolve(newDoc);
    });
  });
}
