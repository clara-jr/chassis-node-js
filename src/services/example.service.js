import exampleRepository from '../repositories/example.repository.js';

async function getAll() {
  return exampleRepository.getAll();
}

async function create(data) {
  return exampleRepository.create(data);
}

async function findAndPopulate(filter) {
  return exampleRepository.findAndPopulate(filter);
}

export default {
  getAll,
  create,
  findAndPopulate
};
