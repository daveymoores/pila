type Data<T, K extends unknown> = K & {
  body: T[];
};

interface PageData<T, K> {
  data: Data<T, K>;
  slices: T[];
}

export default PageData;
