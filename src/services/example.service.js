import repository from '../repositories/example.repository.js';

async function getAll() {
  return repository.getAll();
}

async function create(data) {
  return repository.create(data);
}

export default {
  getAll,
  create,
};
