import type { PrismicDocument } from "@prismicio/client";

import PageType from "../types/PageTypes";
import { getPathsToRevalidate } from "./revalidate-paths";

function doc(
  overrides: Partial<PrismicDocument> & Pick<PrismicDocument, "type">,
): PrismicDocument {
  return {
    id: "doc-1",
    uid: "example",
    url: null,
    href: "https://pila.cdn.prismic.io/doc-1",
    tags: [],
    slugs: ["example"],
    lang: "en-gb",
    alternate_languages: [],
    first_publication_date: "2020-01-01T00:00:00+0000",
    last_publication_date: "2020-01-02T00:00:00+0000",
    data: {},
    ...overrides,
  } as PrismicDocument;
}

describe("getPathsToRevalidate", () => {
  it("uses document.url when present", () => {
    expect(
      getPathsToRevalidate(
        doc({
          type: PageType.DETAIL,
          url: "/reporting-tools/my-detail",
        }),
      ),
    ).toEqual(["/reporting-tools/my-detail"]);
  });

  it("revalidates listing pages for learning modules", () => {
    const paths = getPathsToRevalidate(
      doc({
        type: PageType.LEARNING_MODULE,
        url: "/learning-modules/reporting-tools",
      }),
    );

    expect(paths).toEqual(
      expect.arrayContaining([
        "/learning-modules/reporting-tools",
        "/learning-modules",
        "/",
      ]),
    );
  });

  it("revalidates guides listing for guide documents", () => {
    const paths = getPathsToRevalidate(
      doc({
        type: PageType.GUIDE,
        url: "/guides/my-guide",
      }),
    );

    expect(paths).toEqual(
      expect.arrayContaining(["/guides/my-guide", "/guides"]),
    );
  });

  it("revalidates contact when form singleton changes", () => {
    const paths = getPathsToRevalidate(
      doc({
        type: PageType.FORM,
        url: "/contact",
      }),
    );

    expect(paths).toEqual(expect.arrayContaining(["/contact"]));
  });

  it("revalidates all listing paths when navigation changes", () => {
    expect(
      getPathsToRevalidate(
        doc({
          type: PageType.NAVIGATION,
          url: null,
        }),
      ),
    ).toEqual(["/", "/learning-modules", "/guides", "/contact"]);
  });

  it("ignores non-path urls", () => {
    expect(
      getPathsToRevalidate(
        doc({
          type: PageType.SEO,
          url: "https://pilaproject.org",
        }),
      ),
    ).toEqual(["/", "/learning-modules", "/guides", "/contact"]);
  });
});
