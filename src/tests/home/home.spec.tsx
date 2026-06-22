import "@testing-library/jest-dom";

import { hrefResolver } from "../../../prismicio";
import PageType from "../../../types/PageTypes";

describe("PILA homepage integration", () => {
  it("resolves the home route through the Prismic link resolver", () => {
    expect(hrefResolver({ type: PageType.HOME, link_type: "Document" })).toBe(
      "/",
    );
  });

  it("resolves learning module routes for CMS navigation", () => {
    expect(
      hrefResolver({
        type: PageType.LEARNING_MODULE_HOME,
        link_type: "Document",
      }),
    ).toBe("/learning-modules");
  });
});
