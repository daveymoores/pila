import type { GetStaticPropsContext, GetStaticPropsResult } from "next";

import fetchAssociatedContent from "../../helpers/fetch-associated-content/fetchAssociatedContent";
import { mergeStaticProps } from "../../helpers/merge-static-props";
import { createGetStaticProps } from "../../helpers/prismic-static-props";
import PageType from "../../types/PageTypes";

const getStaticDetailProps = <K>(pageType: PageType) => {
  const isGuidePage = pageType === PageType.GUIDE;

  return async (
    context: GetStaticPropsContext,
  ): Promise<GetStaticPropsResult<K>> => {
    const result = await createGetStaticProps({
      type: pageType,
      uid: (params) =>
        isGuidePage ? (params.guide as string) : (params.detail as string),
      params: {
        fetchLinks: isGuidePage
          ? ["guide_category.title"]
          : ["theme_page.title"],
      },
    })(context);

    if ("notFound" in result && result.notFound) {
      return result;
    }

    const props = result.props as Record<string, unknown>;
    const data = props.data as Record<string, unknown>;
    let associatedContent;

    try {
      const associatedContentData = data?.associatedContent;
      associatedContent =
        associatedContentData &&
        (await fetchAssociatedContent(
          associatedContentData as Parameters<typeof fetchAssociatedContent>[0],
        ));
    } catch (err) {
      console.error(err);
    }

    return mergeStaticProps(result, {
      data: {
        ...data,
        associatedContent: associatedContent || [],
      },
      params: context.params,
    } as unknown as Partial<K>) as GetStaticPropsResult<K>;
  };
};

export default getStaticDetailProps;
