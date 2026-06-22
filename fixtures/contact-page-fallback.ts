import type { RichTextBlock } from "../lib/prismic-types";
import PageType from "../types/PageTypes";

const paragraph = (text: string): RichTextBlock => [
  { type: "paragraph", text, spans: [] },
];

const heading = (text: string): RichTextBlock => [
  { type: "heading1", text, spans: [] },
];

/** Used when the Prismic `form` singleton is unavailable. */
export const contactPageFallbackProps = {
  id: "contact-page-fallback",
  uid: null,
  url: "/contact",
  type: PageType.FORM,
  href: "/contact",
  tags: [],
  first_publication_date: "2020-01-01T00:00:00+0000",
  last_publication_date: "2020-01-01T00:00:00+0000",
  slugs: ["contact"],
  linked_documents: [],
  lang: "en-gb",
  alternate_languages: [],
  error: null,
  data: {
    title: heading("Contact PILA"),
    slices: [],
    metaTitle: "Contact PILA",
    metaDescription: "Contact the PILA team",
    openGraphTitle: "Contact PILA",
    openGraphDescription: "Contact the PILA team",
    submissionSuccess: paragraph("Thanks — your message was received."),
    submissionError: paragraph("Something went wrong. Please try again."),
    queriesLabel: "How can we help?",
    queriesPlaceholder: "Select a topic",
    queries: [
      {
        query: "General enquiry",
        description: paragraph("General questions about PILA."),
      },
    ],
    fields: [
      {
        fieldLabel: "First name",
        fieldName: "firstName",
        fieldWidth: "half",
        fieldType: "TextInput",
        required: true,
      },
      {
        fieldLabel: "Last name",
        fieldName: "lastName",
        fieldWidth: "half",
        fieldType: "TextInput",
        required: true,
      },
      {
        fieldLabel: "Email",
        fieldName: "email",
        fieldWidth: "full",
        fieldType: "TextInput",
        required: true,
      },
      {
        fieldLabel: "Message",
        fieldName: "message",
        fieldWidth: "full",
        fieldType: "TextArea",
        required: true,
      },
    ],
  },
  slices: null,
};
