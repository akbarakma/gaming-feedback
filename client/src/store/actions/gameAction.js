import baseUrl from "../../hooks/baseUrl";
import axios from "axios";
import errorMessage from "../../hooks/errorMessage";

export const getAllGame = (setLoading) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + "/games/all",
      });
      dispatch({
        type: "addGame",
        payload: data.data,
      });
      setLoading(false);
    } catch (err) {
      errorMessage(err);
    }
  };
};

export const getSingleGame = (id, query, setLoading) => {
  return async (dispatch) => {
    try {
      const gameData = await axios({
        method: "GET",
        url: baseUrl + `/games/single/${id}`,
      });
      const feedbackData = await axios({
        method: "GET",
        url: baseUrl + `/feedbacks/games/${id}${query}`,
      });
      dispatch({
        type: "addSingleGame",
        payload: {
          gameData: gameData.data,
          feedbackData: feedbackData.data,
        },
      });
      setLoading(false);
    } catch (err) {
      errorMessage(err);
    }
  };
};

export const getFeedbackCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + "/feedbacks/categories",
      });
      dispatch({
        type: "addFeedbackCategories",
        payload: data,
      });
    } catch (err) {
      errorMessage(err);
    }
  };
};
