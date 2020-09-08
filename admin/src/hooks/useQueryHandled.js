import { useQuery } from '@apollo/client';
import { toastError } from "../libs/toasts";

const useQueryHandled = ({ query, options = {} }) => {
  const { error, ...rest } = useQuery(query, options);

  if (error) {
    console.log('ERROR', error);
    toastError(error.message);
  }

  return {
    error,
    ...rest
  }
}

export default useQueryHandled;
