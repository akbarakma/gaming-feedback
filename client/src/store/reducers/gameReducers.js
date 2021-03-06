const defaultState = {
  game: {},
  gameInclude: {},
  singleGameData: {},
  singleGameFeedback: {
    data: [],
  },
  feedbackCategories: [],
};

const gameReducers = (state = defaultState, action) => {
  switch (action.type) {
    case "addGame":
      return { ...state, game: action.payload.games, gameInclude: action.payload.gameInclude };
    case "addSingleGame":
      return { ...state, singleGameData: action.payload.gameData, singleGameFeedback: action.payload.feedbackData };
    case "addFeedbackGame":
      return { ...state, singleGameFeedback: action.payload };
    case "addFeedbackCategories":
      return { ...state, feedbackCategories: action.payload };
    default:
      return state;
  }
};

export default gameReducers;
