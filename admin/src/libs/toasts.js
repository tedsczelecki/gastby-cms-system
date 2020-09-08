import {toast} from "react-toastify";

export const toastDefaultOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const toastSuccess = (content, options) => {
  toast.success(content, {
    position: "bottom-right",
    ...toastDefaultOptions,
    ...options
  });
}

export const toastError = (content, options) => {
  toast.error(content, {
    ...toastDefaultOptions,
    ...options
  });
}
