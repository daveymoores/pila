import { RichTextBlock } from "prismic-reactjs";

import PageType from "./PageTypes";

type GenericPageProps = {
  title: RichTextBlock[];
};

interface CustomType<T = GenericPageProps> {
  id: string;
  uid: string;
  url: string | undefined;
  type: PageType;
  href: string;
  tags: string[];
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
