// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Prismic from "@prismicio/client";
import { ServerResponse } from "http";
import { Http2ServerRequest } from "http2";

import { linkResolver } from "../../prismic";
import smConfig from "../../sm.json";
export const apiEndpoint = smConfig.apiEndpoint;
const accessToken = "";

// Client method to query from the Prismic repo
const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

const Preview = async (
  req: Http2ServerRequest,
  res: ServerResponse
): Promise<void> => {
  const { token: ref, documentId } = req.query;
  const redirectUrl = await Client(req)
    .getPreviewResolver(ref, documentId)
    .resolve(linkResolver, "/");

  if (!redirectUrl) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({ ref });
  res.writeHead(302, { Location: `${redirectUrl}` });
  res.end();
};

export default Preview;
