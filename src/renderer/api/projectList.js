const {remote} = window.require('electron');
const {dbstore} = remote.getGlobal('services');

export function fetchProjectList() {
  return new Promise((resolve, reject) => {
    dbstore
      .projectList
      .find({}, (err, newDoc) => {
        if (err)
          reject(err);
          resolve([...newDoc]);
      });
  });
}

export function addProject(data){
  return new Promise((resolve, reject) => {
    dbstore
      .projectList
      .insert({...data}, (err, newDoc) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...newDoc}});
      });
  });
}

export function showProject(id){
  return new Promise((resolve, reject) => {
    dbstore
      .projectList
      .find({_id:id}, (err, docs) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...docs}});
      });
  });
}

export function editProject(data){
  return new Promise((resolve, reject) => {
    dbstore
      .projectList
      .update({_id:data._id},{ $set: { ...data.values } }, (err, numReplaced) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...numReplaced}});
      });
  });
}

export function deleteProject(id){
  return new Promise((resolve, reject) => {
    dbstore
      .projectList
      .remove({_id:id},{ }, (err, numRemoved) => {
        if (err){
          reject(err);
        }
        resolve({code:1,data:{...numRemoved}});
      });
  });
}
