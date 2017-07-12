import 'whatwg-fetch';

export function directoryHasErrored(bool) {
  return { type: 'DIRECTORY_HAS_ERRORED', hasErrored: bool };
}
export function directoryIsLoading(bool) {
  return { type: 'DIRECTORY_IS_LOADING', isLoading: bool };
}
export function directoryFetchDataSuccess(directory) {
  return { type: 'DIRECTORY_FETCH_DATA_SUCCESS', directory };
}

export function directoryFetchData(url) {
  return dispatch => {
    dispatch(directoryIsLoading(true));
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(directoryIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(directory => dispatch(directoryFetchDataSuccess(directory)))
      .catch(() => dispatch(directoryHasErrored(true)));
  };
}
