import type { NextApiRequest } from "next";

import { parseRequestBody } from "./parse-request-body";

describe("parseRequestBody", () => {
  it("parses JSON string bodies", () => {
    const req = { body: '{"email":"a@b.com"}' } as NextApiRequest;

    expect(parseRequestBody<{ email: string }>(req)).toEqual({
      email: "a@b.com",
    });
  });

  it("returns already-parsed object bodies", () => {
    const req = {
      body: { email: "a@b.com", firstName: "Ada" },
    } as NextApiRequest;

    expect(parseRequestBody(req)).toEqual({
      email: "a@b.com",
      firstName: "Ada",
    });
  });

  it("throws when the body is missing", () => {
    const req = { body: undefined } as NextApiRequest;

    expect(() => parseRequestBody(req)).toThrow("Request body is missing");
  });
});
