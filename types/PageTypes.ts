enum PrismicPageTypes {
  HOME = "home",
  THEME = "theme_page",
  GUIDE = "guide",
  GUIDE_HOME = "guide_home",
  DETAIL = "detail_page",
  ASSESSMENT_APPLICATION = "assessment_application",
  LEARNING_MODULE = "learning_module",
  LEARNING_MODULE_HOME = "learning_module_home",
  FORM = "form",
  DOORMAT = "doormat",
  NAVIGATION = "navigation",
  FOOTER = "footer",
  SEO = "seo",
  NOTIFICATION = "notification",
  SESSIONS = "sessions",
  DICTIONARY = "dictionary",
  COOKIE_NOTICE = "cookie_notice",
}

enum InternalPageTypes {
  ACCOUNT = "account",
  ERROR = "error",
  EXIT_PREVIEW = "exit_preview",
}

// TODO - add this to prismic (maybe)
enum ExternalPageTypes {
  KNOW_LEARNING = "know_learning",
}

const PageType = {
  ...InternalPageTypes,
  ...PrismicPageTypes,
  ...ExternalPageTypes,
};

type PageType = PrismicPageTypes | InternalPageTypes | ExternalPageTypes;

export default PageType;
