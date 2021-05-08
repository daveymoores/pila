import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, phone, subject, message } = JSON.parse(
    req.body
  );

  const text = `
    From: ${firstName} ${lastName}
    Phone: ${phone}
    Enquiry type:

    Message:
    ${message}
  `;

  try {
    await sgMail.send({
      to: "daveymoores@gmail.com",
      from: email,
      subject,
      text,
    });

    res.json({ message: `Email has been sent` });
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ error: "Error sending email" });
  }
};
