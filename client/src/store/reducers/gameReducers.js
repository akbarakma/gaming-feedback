const defaultState = {
  game: []
};

const gameReducers = (state = defaultState, action) => {
  switch (action.type) {
    case "addGame":
      return { ...state, game: action.payload };
    default:
      return state;
  }
};

export default gameReducers;
