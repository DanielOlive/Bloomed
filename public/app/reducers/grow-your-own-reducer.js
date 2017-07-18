export function directoryHasErrored(state = false, action) {
  switch (action.type) {
    case 'DIRECTORY_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function directoryIsLoading(state = false, action) {
  switch (action.type) {
    case 'DIRECTORY_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function directory(state = [], action) {
  switch (action.type) {
    case 'DIRECTORY_FETCH_DATA_SUCCESS':
      return action.directory;
    default:
      return state;
  }
}
