import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
    queryType,
  } = JSON.parse(req.body);

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
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ error: "Error sending email" });
  }
};
