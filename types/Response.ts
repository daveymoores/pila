import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";

import CustomType from "./CustomType";

interface Response<T> extends Omit<ApiSearchResponse, "results"> {
  results: CustomType<T>[];
}

export default Response;
