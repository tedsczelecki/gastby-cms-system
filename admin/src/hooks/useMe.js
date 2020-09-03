import { ME } from 'queries/auth';
import { useQuery } from '@apollo/react-hooks';

const useMe = () => {
  const { loading, error, data } = useQuery(ME);

  const me = data && { ...data.me };

  if (me) {
    delete me.__typename;
  }

  return {
    loading,
    error,
    me,
  }
}

export default useMe;
