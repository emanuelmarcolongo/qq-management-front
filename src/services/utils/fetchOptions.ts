const createFetchOptions = (
  method: string,
  token?: string,
  data?: any
): RequestInit => {
  const options: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...(data && { "Content-Type": "application/json" }),
    },
    cache: "no-store" as RequestCache,
    ...(data && { body: JSON.stringify(data) }),
  };
  return options;
};

export default createFetchOptions;
