module.exports = {
  api: async (res, action) => {
    try {
      await action();
    } catch (error) {
      console.error('Error: ', error);
      res.status(500).json({success: false, error: error.message});
    }
  },
  parsePagination: ({query}) => {
    const {per_page: perPage = 10, page = 1} = query;
    return {limit: perPage, offset: perPage * (page - 1)};
  },
  parseSorting: ({query}) => {
    const {sort_by: sortBy, sort_dir: sortDir = ''} = query;
    if (!sortBy) return;

    return `${sortDir.toLowerCase() === 'desc' ? '-' : ''}${sortBy}`;
  },
};
