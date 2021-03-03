import PageType from "./PageTypes";

interface CustomType<T = unknown> {
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
  data?: T;
}

export default CustomType;
