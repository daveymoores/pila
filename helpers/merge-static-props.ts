import type { GetStaticPropsResult } from "next";

import { PRISMIC_REVALIDATE_SECONDS } from "../lib/revalidate-config";

/**
 * Merges extra props into a getStaticProps result while preserving
 * `revalidate`, `notFound`, and `redirect`.
 */
export function mergeStaticProps<T>(
  result: GetStaticPropsResult<T>,
  extra?: Partial<T>,
): GetStaticPropsResult<T> {
  if ("notFound" in result && result.notFound) {
    return result;
  }

  if ("redirect" in result && result.redirect) {
    return result;
  }

  const base = result as { props: T; revalidate?: number };

  return {
    props: { ...base.props, ...extra } as T,
    revalidate: base.revalidate ?? PRISMIC_REVALIDATE_SECONDS,
  };
}
