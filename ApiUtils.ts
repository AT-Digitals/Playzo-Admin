const isNetworkError = (err: any) => {
  return !!err.isAxiosError && !err.response;
};

export const handleApiError = (e: any, defaultMessage: string) => {
  if (isNetworkError(e)) {
    return new Error('Failed to connect to server. Please check your internet connection');
  } else {
    return new Error(e.response?.data?.message ?? defaultMessage);
  }
};
