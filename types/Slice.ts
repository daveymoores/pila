export const SliceType = {
  POWERED_BY_RESEARCH_SECTION: "powered_by_research_section",
  IMAGE_WITH_TEXT_SECTION: "image_with_text_section",
  STEPS_SECTION: "steps_section",
  FULL_WIDTH_IMAGE_SECTION: "full_width_image_section",
  THANKS_TO_INSTITUTIONS_SECTION: "thanks_to_institutions_section",
  HIGHLIGHT_BANNER: "highlight_banner",
  RICH_TEXT_BLOCK: "rich_text_block",
  RICH_TEXT_SECTION: "rich_text_section",
};

interface Slice<T, K> {
  slice_type?: keyof typeof SliceType;
  slice_label?: string | null;
  version?: string;
  variation?: "default-slice";
  primary: T;
  items?: K[];
}

export default Slice;
