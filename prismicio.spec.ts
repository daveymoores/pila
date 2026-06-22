import { hrefResolver, repositoryName, resolveLinkSync } from "./prismicio";
import PageType from "./types/PageTypes";

describe("prismicio", () => {
  it("uses the expected repository name", () => {
    expect(repositoryName).toBe("pila");
  });

  describe("hrefResolver", () => {
    it("resolves core routes", () => {
      expect(hrefResolver({ type: PageType.HOME, link_type: "Document" })).toBe(
        "/",
      );
      expect(
        hrefResolver({ type: PageType.GUIDE_HOME, link_type: "Document" }),
      ).toBe("/guides");
      expect(hrefResolver({ type: PageType.FORM, link_type: "Document" })).toBe(
        "/contact",
      );
      expect(
        hrefResolver({
          type: PageType.LEARNING_MODULE,
          link_type: "Document",
        }),
      ).toBe("/learning-modules/[learning_module]");
      expect(
        hrefResolver({
          type: PageType.ASSESSMENT_APPLICATION,
          link_type: "Document",
        }),
      ).toBe("/learning-modules/[learning_module]/[assessment_application]");
    });

    it("falls back to /404 for unknown types", () => {
      expect(hrefResolver({ type: "unknown", link_type: "Document" })).toBe(
        "/404",
      );
    });
  });

  describe("resolveLinkSync", () => {
    it("prefers the url on filled document links", () => {
      expect(
        resolveLinkSync({
          link_type: "Document",
          type: PageType.THEME,
          uid: "about-pila",
          url: "/about-pila",
        }),
      ).toBe("/about-pila");
    });

    it("builds paths from type and uid when url is missing", () => {
      expect(
        resolveLinkSync({
          link_type: "Document",
          type: PageType.GUIDE,
          uid: "my-guide",
        }),
      ).toBe("/guides/my-guide");
    });

    it("resolves web links directly", () => {
      expect(
        resolveLinkSync({
          link_type: "Web",
          url: "https://example.com",
        }),
      ).toBe("https://example.com");
    });
  });
});
