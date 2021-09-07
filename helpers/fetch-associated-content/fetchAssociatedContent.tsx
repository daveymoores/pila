import Prismic from "prismic-javascript";
import ApiSearchResponse from "prismic-javascript/types/ApiSearchResponse";

import { Client } from "../../prismic";
import { DetailPageData } from "../../types/Detail";

const fetchAssociatedContent = async (
  associatedContent: DetailPageData["associatedContent"] = []
) => {
  const associatedContentIds = associatedContent
    .filter(({ link }) => link.id)
    .map(({ link }) => link.id);

  const client = Client();
  let associatedContentData;

  if (!associatedContentIds.some((content) => !content)) {
    try {
      associatedContentData =
        (((await client.query(
          //TODO - why is associatedContent possibly undefined
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Prismic.Predicates.in("document.id", associatedContentIds)
        )) as unknown) as ApiSearchResponse) || {};
    } catch (err) {
      throw new Error(err);
    }
  }

  return associatedContentData;
};

export default fetchAssociatedContent;
