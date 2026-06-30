import * as prismic from "@prismicio/client";
import type { GetStaticPathsResult, GetStaticPropsContext } from "next";

import { PRISMIC_REVALIDATE_SECONDS } from "../lib/revalidate-config";
import { createClient } from "../prismicio";
import QueryType from "../types/QueryType";

type Document = prismic.PrismicDocument;

export interface StaticPropsOptions {
  type: string;
  queryType?: QueryType;
  uid?: (params: Record<string, string>) => string;
  params?: Record<string, unknown>;
}

function getDocumentSlices(data: Record<string, unknown>) {
  if (Array.isArray(data.slices) && data.slices.length > 0) {
    return data.slices;
  }

  if (Array.isArray(data.body)) {
    return data.body;
  }

  return [];
}

function toPageProps(document: Document) {
  const data = document.data as Record<string, unknown>;
  const slices = getDocumentSlices(data);

  return {
    id: document.id,
    uid: document.uid,
    url: document.url,
    type: document.type,
    href: document.url,
    tags: document.tags,
    first_publication_date: document.first_publication_date,
    last_publication_date: document.last_publication_date,
    slugs: document.slugs,
    linked_documents: [],
    lang: document.lang,
    alternate_languages: document.alternate_languages,
    error: null,
    data: { ...data, slices },
    slices,
  };
}

export function createGetStaticProps(options: StaticPropsOptions) {
  return async (context: GetStaticPropsContext) => {
    const client = createClient({ previewData: context.previewData });
    const fetchParams = options.params as prismic.BuildQueryURLArgs | undefined;

    let document: Document | null = null;

    try {
      if (options.queryType === QueryType.SINGLE) {
        document = await client.getSingle(options.type, fetchParams);
      } else if (options.uid) {
        const uid = options.uid(context.params as Record<string, string>);
        document = await client.getByUID(options.type, uid, fetchParams);
      }
    } catch (error) {
      if (error instanceof prismic.NotFoundError) {
        return { notFound: true as const };
      }
      throw error;
    }

    if (!document) {
      return { notFound: true as const };
    }

    return {
      props: toPageProps(document),
      revalidate: PRISMIC_REVALIDATE_SECONDS,
    };
  };
}

export interface StaticPathsOptions<T = Document> {
  type: string;
  fallback?: boolean | "blocking";
  formatPath: (doc: T) => { params: Record<string, string> };
}

export function createGetStaticPaths<T extends Document = Document>(
  options: StaticPathsOptions<T>,
) {
  return async (): Promise<GetStaticPathsResult> => {
    const client = createClient();
    const documents = await client.getAllByType<T>(options.type);

    return {
      paths: documents.map((doc) => options.formatPath(doc)),
      fallback: options.fallback ?? "blocking",
    };
  };
}
