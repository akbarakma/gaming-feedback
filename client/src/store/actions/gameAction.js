import baseUrl from "../../hooks/baseUrl";
import axios from "axios";
import errorMessage from "../../hooks/errorMessage";
import Swal from "sweetalert2";

export const getAllGame = (query, setLoading) => {
  return async (dispatch) => {
    try {
      const gameData = await axios({
        method: "GET",
        url: baseUrl + "/games/all/" + query,
      });
      const gameIncludeData = await axios({
        method: "GET",
        url: baseUrl + "/games/games-include",
      });
      dispatch({
        type: "addGame",
        payload: {
          games: gameData.data,
          gameInclude: gameIncludeData.data,
        },
      });
      setLoading(false);
    } catch (err) {
      errorMessage(err);
      setLoading(false);
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
      setLoading(false);
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

export const addFeedbackToGame = (formData, id, setLoading, query, setEventKey, setPageFeed, setInitForm) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "POST",
        url: baseUrl + `/feedbacks/create/${id}`,
        data: formData,
        headers: {
          token: localStorage.getItem("access_token"),
        },
      });
      const feedbackData = await axios({
        method: "GET",
        url: baseUrl + `/feedbacks/games/${id}${query}`,
      });
      dispatch({
        type: "addFeedbackGame",
        payload: feedbackData.data,
      });
      setLoading(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      setEventKey("0");
      setPageFeed(true);
      Toast.fire({
        icon: "success",
        title: "Feedback Added!",
      });
      setInitForm();
    } catch (err) {
      errorMessage(err);
      setLoading(false);
    }
  };
};

export const addGame = (formData, setLoading, history) => {
  return async () => {
    try {
      await axios({
        method: "POST",
        url: baseUrl + "/games/create",
        data: {
          ...formData,
          categoryArr: JSON.stringify(formData.categoryArr),
          genreArr: JSON.stringify(formData.genreArr),
          languageArr: JSON.stringify(formData.languageArr),
        },
        headers: {
          token: localStorage.getItem("access_token")
        }
      });
      setLoading(false);
      history.push("/profile");
    } catch (err) {
      errorMessage(err);
      setLoading(false);
    }
  };
};
