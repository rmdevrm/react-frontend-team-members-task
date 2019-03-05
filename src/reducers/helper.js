const reducerHelper = {
  getTeamMembersStates (payloadData, state) {
    const {
      items,
      has_previous: hasPrevious,
      has_next: hasNext,
      total_pages: totalPages,
      page: pageNumber,
      page_size: pageSize,
      total_elements: totalElements
    } = payloadData

    return {
      membersList: items,
      filter: state.filter,
      pagination: {
        hasPrevious,
        hasNext,
        totalPages,
        pageNumber,
        pageSize,
        totalElements
      }
    }
  }
}

export default reducerHelper
