import CustomType from "./CustomType";

interface Response<T> {
  page: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page: string | null;
  prev_page: string | null;
  results: CustomType<T>[];
}

export default Response;
