import {
  Box,
  Card,
  Form,
  FormField,
  Grid,
  Heading,
  Layer,
  Select,
  Spinner,
  Text,
  TextArea,
  TextInput,
} from "grommet";
import { GetStaticPropsResult } from "next";
import { useGetStaticProps } from "next-slicezone/hooks";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

import { Client } from "../prismic";
import Button from "../src/atoms/button/Button";
import useNotification from "../src/hooks/useNotification";
import Section from "../src/layout/section/Section";
import { NotificationLinkedProps } from "../src/molecules/notification/Notification";
import RichTextParser from "../src/molecules/rich-text-parser/RichTextParser";
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

type ContactPageProps = ContactPageMainProps & NotificationLinkedProps;

type PageProps = PageData<unknown, ContactPageProps> & JSX.IntrinsicAttributes;

const Page: React.FC<PageProps> = (props) => {
  const {
    metaDescription,
    metaTitle,
    openGraphDescription,
    openGraphImage,
    openGraphTitle,
    notification,
    title,
    submissionSuccess,
    submissionError,
    queriesLabel,
    queriesPlaceholder,
    queries,
    fields,
  } = props.data || {};

  const initialValues = (fields || []).reduce((acc, field) => {
    if (!field.fieldName) return acc;
    return {
      ...acc,
      [field.fieldName]: "",
    };
  }, {});

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<FormValues>(initialValues);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [queryType, setQueryType] = React.useState<string>();
  const [queryDescription, setQueryDescription] = React.useState<
    RichTextBlock[]
  >();

  const onClose = () => location.reload();

  useNotification(notification);

  React.useEffect(() => {
    if (queries && queryType) {
      const query = queries.filter((item) => item.query === queryType);
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
              {RichText.asText(title)}
            </Heading>
          )}
        </Box>
      </Section>
      <Section margin={"auto"}>
        {loading && (
          <Layer>
            <Card
              align="center"
              justify="center"
              gap="small"
              direction="row"
              alignSelf="center"
              pad="large"
            >
              <Spinner />
              <Text>Loading...</Text>
            </Card>
          </Layer>
        )}
        <Box
          width={{ max: "736px", width: "100%" }}
          margin={{ horizontal: "auto", bottom: "xlarge" }}
        >
          {success && submissionSuccess && (
            <Layer
              onClickOutside={onClose}
              onEsc={onClose}
              background={"transparent"}
            >
              <Card
                background={"brand"}
                align="center"
                justify="center"
                gap="small"
                alignSelf="center"
                pad="large"
                width={{ min: "400px" }}
              >
                <StyledRichTextParser body={submissionSuccess} />
                <Button
                  margin={{ top: "medium" }}
                  label="Close"
                  color={colorPalette.green}
                  onClick={onClose}
                />
              </Card>
            </Layer>
          )}
          {error && submissionError && (
            <Layer
              onClickOutside={onClose}
              onEsc={onClose}
              background={"transparent"}
            >
              <Card
                background={"brand"}
                align="center"
                justify="center"
                gap="small"
                alignSelf="center"
                pad="large"
                width={{ min: "400px" }}
              >
                <StyledRichTextParser body={submissionError} />
                <Button
                  label="Close"
                  margin={{ top: "medium" }}
                  color={colorPalette.green}
                  onClick={onClose}
                />
              </Card>
            </Layer>
          )}
          <Form
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue as { [key: string]: string });
            }}
            onSubmit={async (event) => {
              try {
                setLoading(true);
                const response = await fetch("/api/form", {
                  method: "POST",
                  body: JSON.stringify(event.value),
                });

                if (response.status === 200) {
                  setSuccess(true);
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
                  <FormField label={queriesLabel} htmlFor="select">
                    <Select
                      id="select"
                      size={"small"}
                      placeholder={queriesPlaceholder}
                      options={queries.map((queryItem) => queryItem.query)}
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
                  <StyledRichTextParser body={queryDescription} />
                </Card>
              )}
            </Box>
            <Grid columns={["auto", "auto"]} gap={"medium"}>
              {fields &&
                fields.map((field, index) => (
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
              <Button type="submit" label="Submit" primary />
              <Text
                margin={{ left: "small" }}
                size="small"
                color="status-critical"
              >
                * Required Field
              </Text>
            </Box>
          </Form>
        </Box>
      </Section>
    </Box>
  );
};

interface StaticContextProps {
  params: Record<string, unknown>;
}

export const getStaticProps = async (
  context: StaticContextProps
): Promise<GetStaticPropsResult<PageProps>> => {
  const { props } = await useGetStaticProps({
    client: Client(),
    queryType: QueryType.SINGLE,
    type: PageType.FORM,
    params: { fetchLinks: ["notification.body, notification.showGlobal"] },
  })(context);

  return { props: { ...props, slices: null } };
};

const StyledRichTextParser = styled(RichTextParser)`
  color: white;
`;

export default Page;
