const reducerHelper = {
  getTeamMembersStates (payloadData, state) {
    const {
      items,
      has_previous: hasPrevious,
      has_next: hasNext,
      total_pages: totalPages,
      page: pageNumber,
      page_size: pageSize
    } = payloadData

    return {
      list: items,
      filter: state.filter,
      meta: {
        hasPrevious,
        hasNext,
        totalPages,
        pageNumber,
        pageSize
      }
    }
  }
}

export default reducerHelper
