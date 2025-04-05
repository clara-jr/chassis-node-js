export default (model) => ({
  create: async (data) => model.create(data),
  getAll: async () => model.find().exec(),
  find: async (filter = {}) => model.find(filter).exec(),
  findOne: async (filter = {}) => model.findOne(filter).exec(),
  findById: async (id) => model.findById(id).exec(),
  findOneAndUpdate: async (filter, update, options) => model.findOneAndUpdate(filter, update, options).exec(),
  findByIdAndUpdate: async (id, update, options) => model.findByIdAndUpdate(id, update, options).exec(),
  deleteOne: async (model) => model.deleteOne(model),
  deleteMany: async (filter) => model.deleteMany(filter),
  populate: async (array, fields) => model.populate(array, fields)
});