const defaultState = {
  user_data: {},
};

const gameReducers = (state = defaultState, action) => {
  switch (action.type) {
    case "addUser":
      return { ...state.user_data, user_data: action.payload };
    default:
      return state;
  }
};

export default gameReducers;
