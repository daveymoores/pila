import "../styles/globals.css";

import * as prismic from "@prismicio/client";
import { type CreateClientConfig, PrismicPreview } from "@prismicio/next/pages";
import App, { type AppContext, type AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";

import getApplicationAverages from "../helpers/get-application-averages/getApplicationAverages";
import { AuthProvider } from "../lib/auth";
import * as ga from "../lib/ga";
import { getLinkUid } from "../lib/prismic-types";
import { createClient, repositoryName } from "../prismicio";
import PreviewCard from "../src/atoms/preview-card/PreviewCard";
import AssessmentApplicationContext from "../src/context/AssessmentApplicationContext";
import {
  type DictionaryProps,
  DictionaryProvider,
} from "../src/context/DictionaryContext";
import LearningModulesContext from "../src/context/LearningModulesContext";
import { NotificationProvider } from "../src/context/NotificationContext";
import OffCanvasContext from "../src/context/OffCanvasContext";
import Head from "../src/molecules/head/Head";
import { type NotificationProps } from "../src/molecules/notification/Notification";
import { type DoormatProps } from "../src/organisms/doormat/Doormat";
import { type FooterProps } from "../src/organisms/footer/Footer";
import { type NavigationProps } from "../src/organisms/navigation/Navigation";
import Scaffold from "../src/organisms/scaffold/Scaffold";
import SiteScripts from "../src/organisms/site-scripts/SiteScripts";
import PilaTheme from "../src/theme/PilaTheme/PilaTheme";
import type CookieNoticeProps from "../types/CookieNoticeProps";
import type CustomType from "../types/CustomType";
import PageType from "../types/PageTypes";
import type { LearningModuleProps } from "./learning-modules/[learning_module]";
import type {
  AssessmentApplicationMainProps,
  AssessmentApplicationProps,
} from "./learning-modules/[learning_module]/[assessment_application]";

interface DefaultSeoProps {
  url: string;
  title: string;
  description: string;
  site_name: string;
  handle: string;
  appId: string;
}

export interface PageProps {
  assessmentApplications: CustomType<AssessmentApplicationProps>[] | [];
  learningModules: CustomType<LearningModuleProps>[] | [];
  cookieNotice: CustomType<CookieNoticeProps>[] | [];
  notification: CustomType<NotificationProps>[] | [];
  dictionary: CustomType<DictionaryProps>[] | [];
  navigation: CustomType<NavigationProps>[] | [];
  doormat: CustomType<DoormatProps>[] | [];
  footer: CustomType<FooterProps>[] | [];
  seo: CustomType<DefaultSeoProps>[] | [];
  userAgent?: string;
  isPreview?: boolean;
}

const PilaApp = (props: AppProps<PageProps>) => {
  const { Component, pageProps } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const { url, site_name, handle, appId, title, description } =
    (pageProps.seo || [])[0]?.data || {};

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageView(url, title || "", description || "");
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, title, description]);

  const assessmentApplicationAverages = getApplicationAverages(
    (pageProps?.assessmentApplications as CustomType<AssessmentApplicationProps>[]) ||
      [],
  );

  const learningModules: CustomType<LearningModuleProps>[] = (
    (pageProps?.learningModules as CustomType<LearningModuleProps>[]) || []
  ).map((learningModule) => {
    const applications = (pageProps?.assessmentApplications || []).reduce(
      (
        acc: AssessmentApplicationMainProps[],
        application: CustomType<AssessmentApplicationProps>,
      ) => {
        const appData = application.data as
          | AssessmentApplicationMainProps
          | undefined;
        if (getLinkUid(appData?.module) === learningModule.uid) {
          const applicationsStats = assessmentApplicationAverages.find(
            (app) => app.uid === application.uid,
          );

          return [
            ...acc,
            {
              ...(application.data as unknown as AssessmentApplicationMainProps),
              uid: application.uid,
              applicationsStats,
            },
          ];
        }

        return acc;
      },
      [],
    );

    return {
      ...learningModule,
      data: { ...learningModule.data, applications },
    };
  });

  return (
    <AuthProvider>
      <SiteScripts />
      <OffCanvasContext.Provider
        value={{
          isOpen,
          setIsOpen: setIsOpen,
        }}
      >
        <DictionaryProvider dictionaryValues={pageProps.dictionary}>
          <NotificationProvider notifications={pageProps.notification}>
            <LearningModulesContext.Provider value={learningModules}>
              <AssessmentApplicationContext.Provider
                value={
                  (pageProps as unknown as Record<string, unknown>)
                    .assessmentApplication as never
                }
              >
                <Head
                  title={title}
                  description={description}
                  url={url}
                  site_name={site_name}
                  handle={handle}
                  appId={appId}
                />
                <PilaTheme userAgent={pageProps.userAgent}>
                  <Scaffold
                    navigation={
                      (pageProps?.navigation || [])[0]?.data ?? {
                        signedOutMenuItems: [],
                        signedInMenuItems: [],
                      }
                    }
                    doormat={
                      ((pageProps?.doormat || [])[0]?.data ?? {
                        list_one_label: "",
                        list_one_links: [],
                        list_two_label: "",
                        list_two_links: [],
                        list_three_label: "",
                        list_three_links: [],
                        mascotImage: {
                          url: "",
                          alt: "",
                          dimensions: { width: 0, height: 0 },
                        },
                      }) as DoormatProps
                    }
                    footer={
                      (pageProps?.footer || [])[0]?.data ?? {
                        copyright: [],
                        social_icons: [],
                      }
                    }
                  >
                    <Component {...pageProps} />
                  </Scaffold>
                  {pageProps.isPreview && <PreviewCard />}
                </PilaTheme>
              </AssessmentApplicationContext.Provider>
            </LearningModulesContext.Provider>
          </NotificationProvider>
        </DictionaryProvider>
      </OffCanvasContext.Provider>
      <PrismicPreview repositoryName={repositoryName} />
    </AuthProvider>
  );
};

PilaApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const userAgent = appContext.ctx.req?.headers["user-agent"];
  const ctx = appContext.ctx as AppContext["ctx"] & {
    previewData?: CreateClientConfig["previewData"];
  };
  const client = createClient({
    previewData: ctx.previewData,
    ...(ctx.req
      ? { req: ctx.req as unknown as CreateClientConfig["req"] }
      : {}),
  });

  const data = await client.get({
    filters: [
      prismic.filter.any("document.type", [
        PageType.ASSESSMENT_APPLICATION,
        PageType.LEARNING_MODULE,
        PageType.COOKIE_NOTICE,
        PageType.NOTIFICATION,
        PageType.DICTIONARY,
        PageType.NAVIGATION,
        PageType.DOORMAT,
        PageType.FOOTER,
        PageType.SEO,
      ]),
    ],
    fetchLinks: ["document.slug", "document.type"],
    orderings: [{ field: "document.first_publication_date", direction: "asc" }],
  });

  const sortedResults = data.results.reduce(
    (acc: PageProps, result): PageProps => {
      const typed = result as CustomType<unknown>;
      switch (result.type) {
        case PageType.SEO:
          return {
            ...acc,
            seo: [...acc.seo, typed as CustomType<DefaultSeoProps>],
          };
        case PageType.FOOTER:
          return {
            ...acc,
            footer: [...acc.footer, typed as CustomType<FooterProps>],
          };
        case PageType.DOORMAT:
          return {
            ...acc,
            doormat: [...acc.doormat, typed as CustomType<DoormatProps>],
          };
        case PageType.NAVIGATION:
          return {
            ...acc,
            navigation: [
              ...acc.navigation,
              typed as CustomType<NavigationProps>,
            ],
          };
        case PageType.NOTIFICATION:
          return {
            ...acc,
            notification: [
              ...acc.notification,
              typed as CustomType<NotificationProps>,
            ],
          };
        case PageType.DICTIONARY:
          return {
            ...acc,
            dictionary: [
              ...acc.dictionary,
              typed as CustomType<DictionaryProps>,
            ],
          };
        case PageType.COOKIE_NOTICE:
          return {
            ...acc,
            cookieNotice: [
              ...acc.cookieNotice,
              typed as CustomType<CookieNoticeProps>,
            ],
          };
        case PageType.LEARNING_MODULE:
          return {
            ...acc,
            learningModules: [
              ...acc.learningModules,
              typed as CustomType<LearningModuleProps>,
            ],
          };
        case PageType.ASSESSMENT_APPLICATION:
          return {
            ...acc,
            assessmentApplications: [
              ...acc.assessmentApplications,
              typed as CustomType<AssessmentApplicationProps>,
            ],
          };
        default:
          return acc;
      }
    },
    {
      assessmentApplications: [],
      learningModules: [],
      cookieNotice: [],
      notification: [],
      dictionary: [],
      navigation: [],
      doormat: [],
      footer: [],
      seo: [],
    },
  );

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      ...sortedResults,
      userAgent,
      isPreview: appContext.router.isPreview,
    },
  };
};

export default PilaApp;
