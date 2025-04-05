const repository = {
  bootstrap: async (_repository, Model) => {
    Object.assign(repository,  _repository(Model));

    // Specific methods
    const fields = [
      { path: 'user', select: 'fullName' },
    ];
    repository.findAndPopulate = async (filter) => {
      const results = await repository.find(filter);
      return repository.populate(results, fields);
    };
  }
};

export default repository;
