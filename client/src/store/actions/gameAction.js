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