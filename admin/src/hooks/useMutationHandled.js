import { useMutation } from '@apollo/client';
import { toastError, toastSuccess } from "../libs/toasts";

const useQueryHandled = ({ query, options, dataKey }) => {
  const [mutationFunc, { loading, error }] = useMutation(query);

  if (error) {
    toastError(error.message);
  }

  const doMutation = async (options) => {
    console.log('Doing mutation', options);
    try {
      const { data, ...rest } =  await mutationFunc(options);

      console.log('DATA0', data);

      if (data[dataKey] && data[dataKey].message) {
        const toastFunc = data[dataKey].success ? toastSuccess : toastError;
        toastFunc(data[dataKey].message);
      }

      return {
        data,
        ...rest
      }
    } catch(e) {
      // console.log('CATCH', e.message, error.message);
      // if (e.message !== error.message) {
      //   toastError(e.message);
      // }
      return { error: e }
    }
  }

  return {
    loading,
    error,
    doMutation,
  }
}

export default useQueryHandled;
