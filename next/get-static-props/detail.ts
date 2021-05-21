import { GetStaticPropsResult } from "next";
import { useGetStaticProps } from "next-slicezone/hooks";

import fetchAssociatedContent from "../../helpers/fetch-associated-content/fetchAssociatedContent";
import { Client } from "../../prismic";
import PageType from "../../types/PageTypes";

interface BaseStaticContextProps {
  params: Record<string, unknown>;
}

const getStaticDetailProps = <T extends BaseStaticContextProps, K>(
  pageType: PageType
) => async (context: T): Promise<GetStaticPropsResult<K>> => {
  const isGuidePage = pageType === PageType.GUIDE;
  const { props } = await useGetStaticProps({
    client: Client(),
    type: pageType,
    uid: ({ params }) => (isGuidePage ? params.guide : params.detail),
    params: {
      fetchLinks: isGuidePage ? ["guide_category.title"] : ["theme_page.title"],
    },
  })(context);

  let associatedContent;

  try {
    const associatedContentData = props?.data?.associatedContent;
    associatedContent =
      associatedContentData &&
      (await fetchAssociatedContent(props.data.associatedContent));
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      ...props,
      data: {
        ...props.data,
        associatedContent: associatedContent?.results || [],
      },
      params: context.params,
    },
  };
};

export default getStaticDetailProps;
