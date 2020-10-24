import baseUrl from "../../hooks/baseUrl";
import axios from "axios";
import errorMessage from "../../hooks/errorMessage";
import Swal from "sweetalert2";

export const login = (payload, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: baseUrl + "/users/login",
        data: payload,
      });
      localStorage.setItem("access_token", data.access_token);
      history.push("/");
      dispatch({
        type: "addUser",
        payload: data.user_data,
      });
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
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    } catch (err) {
      errorMessage(err);
    }
  };
};

export const getProfile = () => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem("access_token")) {
        const { data } = await axios({
          method: "GET",
          url: baseUrl + "/users/profile",
          headers: {
            token: localStorage.getItem("access_token"),
          },
        });
        dispatch({
          type: "addUser",
          payload: data,
        });
      }
    } catch (err) {
      errorMessage(err);
      localStorage.removeItem("access_token");
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("access_token");
      dispatch({
        type: "logoutUser",
      });
    } catch (err) {
      errorMessage(err);
    }
  };
};

export const registerUser = (payload, history) => {
  return async (dispatch) => {
    try {
      const newPayload = { ...payload, name: payload.firstname + " " + payload.lastname };
      console.log(newPayload);
      const { data } = await axios({
        method: "POST",
        url: baseUrl + "/users/register",
        data: newPayload,
      });
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      dispatch({
        type: "addUser",
        payload: data.user_data,
      });
      history.push("/");
    } catch (err) {
      console.log(err);
      errorMessage(err);
    }
  };
};
