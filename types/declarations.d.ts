declare module "next-slicezone";
declare module "next-slicezone/hooks";
declare module "next-slicezone/resolver";

interface Window {
  grecaptcha: {
    getResponse: () => string;
  };
}
