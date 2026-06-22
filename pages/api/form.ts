import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

import { isMockIntegrations } from "../../lib/mock-config";
import { parseRequestBody } from "../../lib/parse-request-body";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactFormBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  queryType?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body: ContactFormBody;

  try {
    body = parseRequestBody<ContactFormBody>(req);
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { firstName, lastName, email, phone, subject, message, queryType } =
    body;

  if (isMockIntegrations() || !process.env.SENDGRID_API_KEY) {
    console.info("[mock] contact form submission", {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      queryType,
    });

    return res.status(200).json({
      message: "Mock email recorded locally — no message was sent.",
    });
  }

  const messageData = {
    to: process.env.PILA_EMAIL as string,
    from: process.env.PILA_EMAIL as string,
    templateId: process.env.SENDGRID_TEMPLATE_ID as string,
    dynamic_template_data: {
      email,
      firstName,
      lastName,
      phone,
      subject,
      message,
      queryType,
    },
  };

  try {
    await sgMail.send(messageData);
    res.json({ message: `Email has been sent` });
  } catch (error: unknown) {
    console.error(error);
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "body" in error.response
    ) {
      console.error(error.response.body);
    }
    res.status(500).json({ error: "Error sending email" });
  }
};
