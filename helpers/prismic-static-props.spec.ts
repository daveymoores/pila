import { NotFoundError } from "@prismicio/client";

import { createClient } from "../prismicio";
import QueryType from "../types/QueryType";
import {
  createGetStaticPaths,
  createGetStaticProps,
} from "./prismic-static-props";

jest.mock("../prismicio", () => ({
  createClient: jest.fn(),
}));

describe("prismic-static-props", () => {
  const mockGetSingle = jest.fn();
  const mockGetByUID = jest.fn();
  const mockGetAllByType = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue({
      getSingle: mockGetSingle,
      getByUID: mockGetByUID,
      getAllByType: mockGetAllByType,
    });
  });

  describe("createGetStaticProps", () => {
    it("returns notFound when Prismic throws NotFoundError", async () => {
      mockGetSingle.mockRejectedValue(
        new NotFoundError("No documents were returned", undefined, undefined),
      );

      const getStaticProps = createGetStaticProps({
        queryType: QueryType.SINGLE,
        type: "form",
      });

      await expect(
        getStaticProps({ previewData: undefined, params: {} }),
      ).resolves.toEqual({ notFound: true });
    });

    it("maps a singleton document into page props", async () => {
      mockGetSingle.mockResolvedValue({
        id: "doc-1",
        uid: null,
        url: "/contact",
        type: "form",
        tags: [],
        slugs: ["contact"],
        lang: "en-gb",
        alternate_languages: [],
        first_publication_date: "2020-01-01T00:00:00+0000",
        last_publication_date: "2020-01-02T00:00:00+0000",
        data: { title: "Contact", slices: [{ slice_type: "rich_text_block" }] },
      });

      const getStaticProps = createGetStaticProps({
        queryType: QueryType.SINGLE,
        type: "form",
      });

      const result = await getStaticProps({
        previewData: undefined,
        params: {},
      });

      expect(result).toEqual({
        props: {
          id: "doc-1",
          uid: null,
          url: "/contact",
          type: "form",
          href: "/contact",
          tags: [],
          slugs: ["contact"],
          lang: "en-gb",
          alternate_languages: [],
          first_publication_date: "2020-01-01T00:00:00+0000",
          last_publication_date: "2020-01-02T00:00:00+0000",
          linked_documents: [],
          error: null,
          data: {
            title: "Contact",
            slices: [{ slice_type: "rich_text_block" }],
          },
          slices: [{ slice_type: "rich_text_block" }],
        },
      });
    });

    it("falls back to legacy body slices when slices is empty", async () => {
      mockGetSingle.mockResolvedValue({
        id: "home-1",
        uid: null,
        url: "/",
        type: "home",
        tags: [],
        slugs: ["home"],
        lang: "en-gb",
        alternate_languages: [],
        first_publication_date: "2020-01-01T00:00:00+0000",
        last_publication_date: "2020-01-02T00:00:00+0000",
        data: {
          title: "Home",
          body: [{ slice_type: "powered_by_research_section" }],
        },
      });

      const getStaticProps = createGetStaticProps({
        queryType: QueryType.SINGLE,
        type: "home",
      });

      const result = await getStaticProps({
        previewData: undefined,
        params: {},
      });

      expect(result).toMatchObject({
        props: {
          slices: [{ slice_type: "powered_by_research_section" }],
        },
      });
    });

    it("fetches documents by uid when configured", async () => {
      mockGetByUID.mockResolvedValue({
        id: "guide-1",
        uid: "my-guide",
        url: "/guides/my-guide",
        type: "guide",
        tags: [],
        slugs: ["my-guide"],
        lang: "en-gb",
        alternate_languages: [],
        first_publication_date: "2020-01-01T00:00:00+0000",
        last_publication_date: "2020-01-02T00:00:00+0000",
        data: { slices: [] },
      });

      const getStaticProps = createGetStaticProps({
        type: "guide",
        uid: ({ guide }) => guide,
      });

      await getStaticProps({
        previewData: undefined,
        params: { guide: "my-guide" },
      });

      expect(mockGetByUID).toHaveBeenCalledWith("guide", "my-guide", undefined);
    });
  });

  describe("createGetStaticPaths", () => {
    it("maps documents into static paths", async () => {
      mockGetAllByType.mockResolvedValue([
        { uid: "guide-one" },
        { uid: "guide-two" },
      ]);

      const getStaticPaths = createGetStaticPaths({
        type: "guide",
        formatPath: (doc) => ({ params: { guide: doc.uid || "" } }),
      });

      await expect(getStaticPaths()).resolves.toEqual({
        paths: [
          { params: { guide: "guide-one" } },
          { params: { guide: "guide-two" } },
        ],
        fallback: false,
      });
    });
  });
});
