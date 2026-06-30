import PageType from "../types/PageTypes";
import { resolvePathsFromWebhookDocumentIds } from "./revalidate-webhook";

describe("resolvePathsFromWebhookDocumentIds", () => {
  it("resolves paths from fetched Prismic documents", async () => {
    const client = {
      getByID: jest.fn().mockResolvedValue({
        id: "home-1",
        type: PageType.HOME,
        url: "/",
      }),
    };

    const paths = await resolvePathsFromWebhookDocumentIds(client as never, [
      "home-1",
    ]);

    expect(paths).toEqual(["/"]);
    expect(client.getByID).toHaveBeenCalledWith("home-1");
  });

  it("falls back to listing paths when a document cannot be fetched", async () => {
    const client = {
      getByID: jest.fn().mockRejectedValue(new Error("Not found")),
    };

    const paths = await resolvePathsFromWebhookDocumentIds(client as never, [
      "removed-doc",
    ]);

    expect(paths).toEqual(["/", "/learning-modules", "/guides", "/contact"]);
  });
});
