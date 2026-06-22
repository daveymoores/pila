import {
  asContentRelationship,
  asLinkField,
  getLinkUid,
  getLinkUrl,
  type Link,
} from "./prismic-types";

describe("prismic-types helpers", () => {
  describe("getLinkUrl", () => {
    it("returns url when present", () => {
      const link: Link = { link_type: "Web", url: "https://example.com" };
      expect(getLinkUrl(link)).toBe("https://example.com");
    });

    it("returns undefined for missing url", () => {
      expect(
        getLinkUrl({ link_type: "Document", type: "home" }),
      ).toBeUndefined();
      expect(getLinkUrl(undefined)).toBeUndefined();
    });

    it("converts null url to undefined", () => {
      expect(getLinkUrl({ url: null })).toBeUndefined();
    });
  });

  describe("getLinkUid", () => {
    it("returns uid when present", () => {
      const link: Link = {
        link_type: "Document",
        type: "guide",
        uid: "my-guide",
      };
      expect(getLinkUid(link)).toBe("my-guide");
    });

    it("returns undefined when uid is absent", () => {
      expect(
        getLinkUid({ link_type: "Web", url: "https://example.com" }),
      ).toBeUndefined();
    });
  });

  describe("asLinkField", () => {
    it("casts legacy link objects to LinkField", () => {
      const link: Link = { link_type: "Web", url: "https://example.com" };
      expect(asLinkField(link)).toEqual(link);
    });
  });

  describe("asContentRelationship", () => {
    it("casts legacy link objects to ContentRelationshipField", () => {
      const link: Link = {
        link_type: "Document",
        type: "guide",
        id: "abc123",
        uid: "my-guide",
      };
      expect(asContentRelationship(link)).toEqual(link);
    });
  });
});
