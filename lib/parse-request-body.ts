import type { NextApiRequest } from "next";

export function parseRequestBody<T extends object>(req: NextApiRequest): T {
  if (typeof req.body === "string") {
    return JSON.parse(req.body) as T;
  }

  if (req.body && typeof req.body === "object") {
    return req.body as T;
  }

  throw new Error("Request body is missing or invalid");
}
