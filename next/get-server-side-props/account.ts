import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Prismic from "prismic-javascript";

import firebaseAdmin from "../../lib/firebase-admin";
import { SessionsPageProps } from "../../pages/account/sessions";
import { Client } from "../../prismic";
import CustomType from "../../types/CustomType";

interface Response extends Omit<ApiSearchResponse, "results"> {
  results: CustomType<SessionsPageProps>[];
}

const getAccountServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    /* TODO: Assess if these server props necessary for next rev
    const client = Client();
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    let data;

    const { name } = token;

    try {
      data =
        (((await client.query(
          Prismic.Predicates.at("document.type", "sessions")
        )) as unknown) as Response) || {};
    } catch (err) {
      throw new Error(err);
    }*/

    return {
      props: {
        data: {
          name: 'Singapore Demo',
          greeting: 'Hello'
        },
      },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();

    return { props: {} as never };
  }
};

export default getAccountServerSideProps;
