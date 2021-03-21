/// <reference types="next" />
/// <reference types="next/types/global" />
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
  formatPath: (arg: { uid: string }) => Params;
}

interface IUseGetStaticProps {
  client: unknown;
  type: string;
  queryType?: string;
  uid?: (arg: Params) => string;
  body?: string;
  params?: Record<string, unknown>;
}
