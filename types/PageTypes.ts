enum PrismicPageTypes {
  HOME = "home",
  THEME = "theme_page",
  GUIDE = "guide",
  DETAIL = "detail",
  ASSESSMENT_APPLICATION = "assessment_application",
  LEARNING_MODULE = "learning_module",
  LEARNING_MODULE_HOME = "learning_module_home",
  FORM = "form",
  DOORMAT = "doormat",
  NAVIGATION = "navigation",
  FOOTER = "footer",
  SEO = "seo",
  NOTIFICATION = "notification",
}

enum InternalPageTypes {
  ACCOUNT = "account",
  SESSION = "session",
  ERROR = "error",
  EXIT_PREVIEW = "exit_preview",
}

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
