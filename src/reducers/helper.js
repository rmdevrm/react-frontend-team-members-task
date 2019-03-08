const reducerHelper = {
  getTeamMembersStates (payloadData, state) {
    const {
      items,
      has_previous: hasPrevious,
      has_next: hasNext,
      total_pages: totalPages,
      page: pageNumber,
      per: pageSize,
      total_count: totalElements
    } = payloadData

    const filterPageNumber = pageNumber - 1

    return {
      membersList: items,
      filter: state.filter,
      pagination: {
        hasPrevious,
        hasNext,
        totalPages,
        pageNumber: filterPageNumber < 0 ? 0 : filterPageNumber,
        totalElements,
        pageSize
      }
    }
  }
}

export default reducerHelper
