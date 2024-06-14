const handleResponse = async <T>(response: Response): Promise<T> => {
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export default handleResponse;
