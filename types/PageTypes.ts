enum PrismicPageTypes {
  HOME = "home",
  THEME = "theme_page",
  GUIDE = "guide",
  ASSESSMENT_APPLICATION = "assessment_application",
  LEARNING_MODULE = "learning_module",
  LEARNING_MODULE_HOME = "learning_module_home",
  FORM = "form",
  DOORMAT = "doormat",
  NAVIGATION = "navigation",
  FOOTER = "footer",
  SEO = "seo",
}

enum InternalPageTypes {
  ACCOUNT = "account",
  SESSION = "session",
  ERROR = "error",
}

const PageType = { ...InternalPageTypes, ...PrismicPageTypes };

type PageType = PrismicPageTypes | InternalPageTypes;

export default PageType;
