import { asSlices } from "./slices-helper";

describe("asSlices", () => {
  it("returns an empty array for nullish input", () => {
    expect(asSlices(null)).toEqual([]);
    expect(asSlices(undefined)).toEqual([]);
  });

  it("preserves slice content for SliceZone", () => {
    const slices = [
      { slice_type: "rich_text_block", primary: { body: [] } },
      {
        slice_type: "image_block",
        primary: { image: { url: "https://example.com" } },
      },
    ];

    expect(asSlices(slices)).toEqual(slices);
  });

  it("accepts slices with optional slice_type", () => {
    const slices = [{ slice_type: undefined, primary: {} }];
    expect(asSlices(slices)).toEqual(slices);
  });
});
