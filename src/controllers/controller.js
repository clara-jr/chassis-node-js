import Service from '../services/service.js';

async function getAll(req, res) {
	const data = await Service.getAll(req);
	res.status(200).json(data);
}

export default {
	getAll,
};
