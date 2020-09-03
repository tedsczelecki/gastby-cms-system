import {toast} from "react-toastify";

export const toastSuccess = (content, options) => {
  console.log('HII');
  toast.success(content, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options
  });
}
