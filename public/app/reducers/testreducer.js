const testreducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_MOVIE_RECEIVED':
      return action.data;
    default:
      return state;
  }
};

export default testreducer;
