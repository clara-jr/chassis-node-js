import Service from '../services/example.service.js';
import schema from '../dtos/example.dto.js';

async function getAll(req, res) {
  const data = await Service.getAll(req);
  res.status(200).json(data);
}

async function create(req, res) {
  const body = await schema.validateAsync(req.body);
  const data = await Service.create(body);
  res.status(201).json(data);
}

export default {
  getAll,
  create,
};
