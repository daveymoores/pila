import { isFilled } from "@prismicio/client";

import { asContentRelationship } from "../../lib/prismic-types";
import { createClient } from "../../prismicio";
import { DetailPageData } from "../../types/Detail";

const fetchAssociatedContent = async (
  associatedContent: DetailPageData["associatedContent"] = [],
) => {
  const associatedContentIds = associatedContent
    .filter(({ link }) => {
      const relationship = asContentRelationship(link);
      return isFilled.contentRelationship(relationship) && relationship.id;
    })
    .map(({ link }) => {
      const relationship = asContentRelationship(link);
      return isFilled.contentRelationship(relationship) ? relationship.id : "";
    })
    .filter(Boolean);

  if (!associatedContentIds.length) {
    return undefined;
  }

  const client = createClient();
  return client.getByIDs(associatedContentIds);
};

export default fetchAssociatedContent;
