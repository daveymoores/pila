import { asText } from "@prismicio/client";
import {
  Box,
  Card,
  Form,
  FormField,
  Grid,
  Heading,
  Select,
  Text,
  TextArea,
  TextInput,
} from "grommet";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Script from "next/script";
import React from "react";
import styled from "styled-components";

import { contactPageFallbackProps } from "../fixtures/contact-page-fallback";
import { createGetStaticProps } from "../helpers/prismic-static-props";
import { gaEvent, GAEventType } from "../lib/ga";
import type { RichTextBlock } from "../lib/prismic-types";
import Button from "../src/atoms/button/Button";
import Loader from "../src/atoms/loader/Loader";
import DictionaryContext from "../src/context/DictionaryContext";
import Section from "../src/layout/section/Section";
import RichTextParser from "../src/molecules/rich-text-parser/RichTextParser";
import Modal from "../src/organisms/modal/Modal";
import Seo from "../src/organisms/seo/Seo";
import { colorPalette } from "../src/theme/pila";
import PageData from "../types/PageData";
import PageType from "../types/PageTypes";
import QueryType from "../types/QueryType";

interface ContactQueries {
  query: string;
  description: RichTextBlock[];
}

enum FieldWidth {
  FULL = "full",
  HALF = "half",
}

enum FieldType {
  TEXT_INPUT = "TextInput",
  TEXTAREA = "TextArea",
}

interface Field {
  required?: boolean;
  fieldLabel?: string;
  fieldName?: string;
  fieldHelp?: string;
  fieldError?: string;
  fieldWidth: FieldWidth;
  fieldType: FieldType;
}

interface ContactPageMainProps {
  title?: RichTextBlock[];
  submissionSuccess?: RichTextBlock[];
  submissionError?: RichTextBlock[];
  queriesLabel?: string;
  queriesPlaceholder?: string;
  queries?: ContactQueries[];
  fields?: Field[];
}

type FormValues = { [key: string]: string };

type ContactPageProps = ContactPageMainProps;

type PageProps = PageData<unknown, ContactPageProps>;

const Page: React.FC<PageProps> = (props) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    title,
    submissionSuccess,
    submissionError,
    queriesLabel,
    queriesPlaceholder,
    queries,
    fields,
  } = props.data || {};

  const { getDictionaryValue } = React.useContext(DictionaryContext);

  const initialValues = (fields || []).reduce(
    (acc: FormValues, field: Field) => {
      if (!field.fieldName) return acc;
      return {
        ...acc,
        [field.fieldName]: "",
      };
    },
    {},
  );

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<FormValues>(initialValues);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [queryType, setQueryType] = React.useState<string>();
  const [queryDescription, setQueryDescription] =
    React.useState<RichTextBlock[]>();

  React.useEffect(() => {
    if (queries && queryType) {
      const query = queries.filter(
        (item: ContactQueries) => item.query === queryType,
      );
      setQueryDescription(query[0].description);
      setDisabled(false);
    }
  }, [queries, queryType]);

  const getFieldWidth = (field: Field, index: number) => {
    if (field.fieldWidth == FieldWidth.FULL) {
      return { gridColumnStart: 1, gridColumnEnd: 3 };
    }

    return {
      gridColumnStart: !(index % 2) ? 1 : 2,
      gridColumnEnd: !(index % 2) ? 2 : 3,
    };
  };

  return (
    <Box
      width={"100%"}
      background={"light-1"}
      pad={{
        top: "medium",
        bottom: "xlarge",
      }}
    >
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
      <Seo
        metaDescription={metaDescription}
        metaTitle={metaTitle}
        openGraphDescription={openGraphDescription}
        openGraphImage={openGraphImage}
        openGraphTitle={openGraphTitle}
      />
      <Section>
        <Box
          gridArea="title"
          pad={{ top: "xlarge", bottom: "xlarge" }}
          align={"center"}
        >
          {title && (
            <Heading
              textAlign={"start"}
              level={"1"}
              alignSelf={"stretch"}
              size="small"
              margin={{ top: "xlarge", bottom: "medium" }}
            >
              {asText(title)}
            </Heading>
          )}
        </Box>
      </Section>
      <Section margin={"auto"}>
        {loading && <Loader />}
        <Box
          width={{ max: "736px", width: "100%" }}
          margin={{ horizontal: "auto", bottom: "xlarge" }}
        >
          {success && submissionSuccess && (
            <Modal>
              <StyledRichTextParser body={submissionSuccess as RichTextBlock} />
            </Modal>
          )}
          {error && submissionError && (
            <Modal>
              <StyledRichTextParser body={submissionError as RichTextBlock} />
            </Modal>
          )}
          <Form
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue as { [key: string]: string });
            }}
            onSubmit={async (event) => {
              const response = window.grecaptcha?.getResponse() ?? "";
              if (response.length === 0) {
                alert("Please validate the Captcha test");
                return false;
              }

              try {
                setLoading(true);
                const response = await fetch("/api/form", {
                  method: "POST",
                  body: JSON.stringify(event.value),
                });

                if (response.status === 200) {
                  setSuccess(true);
                  gaEvent(GAEventType.CONTACT_FORM);
                } else {
                  setError(true);
                }
              } catch {
                setError(true);
              }
            }}
          >
            <Box align="start" margin={{ bottom: "large" }}>
              {queries && (
                <Box>
                  <FormField label={queriesLabel} htmlFor="queryType">
                    <Select
                      name={"queryType"}
                      id="queryType"
                      size={"small"}
                      placeholder={queriesPlaceholder}
                      options={queries.map(
                        (queryItem: ContactQueries) => queryItem.query,
                      )}
                      value={queryType}
                      onChange={({ option }) => setQueryType(option)}
                    />
                  </FormField>
                </Box>
              )}
              {queryDescription && (
                <Card
                  pad={"large"}
                  round={"medium"}
                  elevation={"large"}
                  background={colorPalette.green}
                  margin={{ top: "medium" }}
                >
                  <StyledRichTextParser
                    body={queryDescription as RichTextBlock}
                  />
                </Card>
              )}
            </Box>
            <Grid columns={["auto", "auto"]} gap={"medium"}>
              {fields &&
                fields.map((field: Field, index: number) => (
                  <Box key={index} style={getFieldWidth(field, index)}>
                    <FormField
                      label={`${field.fieldLabel}${field.required ? "*" : ""}`}
                      name={field.fieldName}
                      required={field.required}
                      htmlFor={field.fieldName}
                      disabled={disabled}
                      margin={"none"}
                      style={{ pointerEvents: disabled ? "none" : "all" }}
                    >
                      {field.fieldType === FieldType.TEXT_INPUT ? (
                        <TextInput
                          size={"small"}
                          id={field.fieldName}
                          placeholder={field.fieldHelp}
                          name={field.fieldName}
                          type={field.fieldName === "email" ? "email" : "text"}
                        />
                      ) : (
                        <TextArea
                          size={"small"}
                          id={field.fieldName}
                          placeholder={field.fieldHelp}
                          name={field.fieldName}
                        />
                      )}
                    </FormField>
                  </Box>
                ))}
            </Grid>
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
              <Box>
                <div
                  className="g-recaptcha"
                  data-sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA}
                />
                <Button
                  margin={{ top: "medium" }}
                  type="submit"
                  label="Submit"
                  primary
                />
              </Box>

              <Text
                margin={{ left: "small" }}
                size="small"
                color="status-critical"
              >
                {getDictionaryValue("* Required field")}
              </Text>
            </Box>
          </Form>
        </Box>
      </Section>
    </Box>
  );
};

export const getStaticProps = async (
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<PageProps>> => {
  const pageResult = await createGetStaticProps({
    queryType: QueryType.SINGLE,
    type: PageType.FORM,
  })(context);

  if ("notFound" in pageResult && pageResult.notFound) {
    return {
      props: {
        ...contactPageFallbackProps,
        slices: null,
      } as unknown as PageProps,
    };
  }

  return {
    props: {
      ...pageResult.props,
      slices: null,
    } as unknown as PageProps,
  };
};

const StyledRichTextParser = styled(RichTextParser)`
  color: white;
`;

export default Page;
