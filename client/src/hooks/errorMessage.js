import Swal from "sweetalert2";

export default (err) => {
  let msg = "";
  if (err.response) {
    if (Array.isArray(err.response.data.msg)) {
      msg = err.response.data.msg.join("<br>");
    } else {
      msg = err.response.data.msg;
    }
  } else if (err.request) {
    msg = err.request;
  } else {
    msg = err.message;
  }
  Swal.fire({
    icon: "error",
    title: "Oops...",
    html: `${msg}`,
  });
};
