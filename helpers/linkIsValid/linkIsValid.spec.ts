import linkIsValid from "./linkIsValid";

describe("linkIsValid", () => {
  it("returns false for empty links", () => {
    expect(linkIsValid(undefined)).toBe(false);
    expect(linkIsValid({})).toBe(false);
  });

  it("returns true for filled document links", () => {
    expect(
      linkIsValid({
        link_type: "Document",
        id: "abc",
        type: "guide",
        uid: "my-guide",
        tags: [],
        lang: "en-gb",
        slug: "my-guide",
        isBroken: false,
      }),
    ).toBe(true);
  });

  it("returns true for filled web links with a url", () => {
    expect(
      linkIsValid({
        link_type: "Web",
        url: "https://example.com",
      }),
    ).toBe(true);
  });

  it("returns false for web links without a url", () => {
    expect(
      linkIsValid({
        link_type: "Web",
        url: "",
      }),
    ).toBe(false);
  });
});
