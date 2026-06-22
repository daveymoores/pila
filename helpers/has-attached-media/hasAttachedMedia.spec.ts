import hasAttachedMedia from "./hasAttachedMedia";

describe("hasAttachedMedia", () => {
  it("returns false for empty links", () => {
    expect(hasAttachedMedia(undefined)).toBe(false);
  });

  it("returns true for filled media links with metadata", () => {
    expect(
      hasAttachedMedia({
        link_type: "Media",
        id: "media-1",
        name: "guide.pdf",
        kind: "document",
        url: "https://example.com/guide.pdf",
        size: "1024",
      }),
    ).toBe(true);
  });

  it("returns false for media links missing required metadata", () => {
    expect(
      hasAttachedMedia({
        link_type: "Media",
        url: "https://example.com/guide.pdf",
      }),
    ).toBe(false);
  });
});
