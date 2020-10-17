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
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    } catch (err) {
      errorMessage(err);
    }
  };
};

export const getProfile = () => {
  return async (dispatch) => {
    try {
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
    } catch (err) {
      errorMessage(err);
      localStorage.removeItem("access_token");
    }
  };
};
