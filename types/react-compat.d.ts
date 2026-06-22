import "react";

import type { JSX as ReactJSX } from "react";

declare module "grommet" {
  interface BoxProps {
    children?: React.ReactNode;
  }
}

declare global {
  namespace JSX {
    type Element = ReactJSX.Element;
    type ElementClass = ReactJSX.ElementClass;
    type ElementAttributesProperty = ReactJSX.ElementAttributesProperty;
    type ElementChildrenAttribute = ReactJSX.ElementChildrenAttribute;
    type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<
      C,
      P
    >;
    type IntrinsicAttributes = ReactJSX.IntrinsicAttributes;
    type IntrinsicClassAttributes<T> = ReactJSX.IntrinsicClassAttributes<T>;
    type IntrinsicElements = ReactJSX.IntrinsicElements;
  }

  interface Window {
    grecaptcha?: {
      getResponse: () => string;
    };
  }
}

export {};
