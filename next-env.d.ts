/// <reference types="next" />
/// <reference types="next/types/global" />
interface ReCaptchaInstance {
  ready: (cb: () => any) => void;
  execute: (key: string, options: ReCaptchaExecuteOptions) => Promise<string>;
  render: (id: string, options: ReCaptchaRenderOptions) => any;
  getResponse: () => any[];
}

declare const grecaptcha: ReCaptchaInstance;
declare module "react-cookienotice";
declare module "../../know-learning-api/knowLearningApiClient";
declare module "next-slicezone";
declare module "next-slicezone/resolver";
declare module "next-slicezone/hooks" {
  export function useGetStaticPaths(props: IUseGetStaticPaths);
  export function useGetStaticProps(props: IUseGetStaticProps);
}

type Params = { params: { [key: string]: string } };

interface IUseGetStaticPaths {
  client: unknown;
  type: string;
  fallback: boolean;
  formatPath: (arg: T) => K;
}

interface IUseGetStaticProps {
  client: unknown;
  type: string;
  queryType?: string;
  uid?: (arg: Params) => string;
  body?: string;
  params?: Record<string, unknown>;
}
