import PageType from "../types/PageTypes";
import {
  mapDocumentToProgrammeCard,
  type ProgrammeCardData,
} from "./resolve-programme-cards";

describe("mapDocumentToProgrammeCard", () => {
  it("maps learning_module documents to card props", () => {
    const card = mapDocumentToProgrammeCard({
      id: "module-1",
      uid: "reporting-tools",
      url: "/learning-modules/reporting-tools",
      type: PageType.LEARNING_MODULE,
      data: {
        title: [{ type: "heading1", text: "Reporting Tools", spans: [] }],
        bodyShort: [
          {
            type: "paragraph",
            text: "Short summary for the card.",
            spans: [],
          },
        ],
        icon: {
          url: "https://images.prismic.io/pila/icon.png",
          dimensions: { width: 100, height: 100 },
        },
      },
    } as never);

    expect(card).toMatchObject({
      id: "module-1",
      link: {
        url: "/learning-modules/reporting-tools",
        uid: "reporting-tools",
        type: PageType.LEARNING_MODULE,
      },
    });
    expect(card.body).toEqual([
      expect.objectContaining({ text: "Short summary for the card." }),
    ]);
  });

  it("maps theme_page documents using the first slice body", () => {
    const card: ProgrammeCardData = mapDocumentToProgrammeCard({
      id: "theme-1",
      uid: "reporting-tools",
      url: "/reporting-tools",
      type: PageType.THEME,
      data: {
        title: [{ type: "heading1", text: "Reporting tools", spans: [] }],
        image: {
          url: "https://images.prismic.io/pila/hero.png",
          dimensions: { width: 200, height: 200 },
        },
        body: [
          {
            slice_type: "rich_text_section",
            primary: {
              body: [
                {
                  type: "paragraph",
                  text: "Theme page intro copy for the homepage card.",
                  spans: [],
                },
              ],
            },
          },
        ],
      },
    } as never);

    expect(card.link?.url).toBe("/reporting-tools");
    expect(card.body).toEqual([
      expect.objectContaining({
        text: "Theme page intro copy for the homepage card.",
      }),
    ]);
    expect(card.icon).toEqual(
      expect.objectContaining({
        url: "https://images.prismic.io/pila/hero.png",
      }),
    );
  });
});
