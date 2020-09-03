export const cleanErrorMessage = ({ error }) => {
  const _error = error.message || error;
  return _error.replace('GraphQL error:', '').trim();
}
