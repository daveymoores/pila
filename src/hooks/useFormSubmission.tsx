import useSWR from "swr";

interface Response {
  sent: any;
  isLoading: boolean;
  isError: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useFormSubmission = (shouldFetch: boolean): Response => {
  const { data, error } = useSWR(shouldFetch ? `/api/form` : null, fetcher);

  return {
    sent: data,
    isLoading: shouldFetch && !error && !data,
    isError: error,
  };
};

export default useFormSubmission;
