const repository = {
  bootstrap: (repoImpl, Model) => {
    Object.assign(repository,  repoImpl(Model));
  },
  // Specific methods
  findAndPopulate: async (filter) => {
    const fields = [
      { path: 'user', select: 'fullName' },
    ];
    const results = await repository.find(filter);
    return repository.populate(results, fields);
  }
};

export default repository;
