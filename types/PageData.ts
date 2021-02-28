import PageType from "./PageTypes";

type Data<T, K extends unknown> = K & {
  body: T[];
};

interface PageData<T, K> {
  id: string;
  uid: string;
  url: null;
  type: PageType;
  href: string;
  tags: unknown[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: [];
  lang: "en-us";
  alternate_languages: [];
  error: null;
  data: Data<T, K>;
  slices: T[];
}

export default PageData;
