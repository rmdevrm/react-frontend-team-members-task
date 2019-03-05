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
      list: items,
      filter: state.filter,
      // pagination: {
      //   hasPrevious,
      //   hasNext,
      //   totalPages,
      //   pageNumber,
      //   pageSize,
      //   totalElements
      // }
      pagination: {
        pageNumber: 0,
        hasPrevious: false,
        hasNext: false,
        totalPages: 0,
        totalElements: 0,
        pageSize: 10
      }
    }
  }
}

export default reducerHelper
