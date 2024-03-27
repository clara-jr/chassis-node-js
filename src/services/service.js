import Model from '../models/model.js';

async function getAll() {
  return Model.find();
}

async function create(data) {
  return Model.create(data);
}

export default {
  getAll,
  create,
};
