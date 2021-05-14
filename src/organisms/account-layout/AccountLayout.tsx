import { Box, Card, Heading, Layer, Paragraph, Spinner } from "grommet";
import React from "react";

import { Theme } from "../../../types/Theme";
import Button from "../../atoms/button/Button";
import Section from "../../layout/section/Section";
import AccountMenu from "../../molecules/account-menu/AccountMenu";
import { colorPalette } from "../../theme/pila";
import HeroText from "../hero-text/HeroText";
import ResponsiveGrid from "../responsive-grid/ResponsiveGrid";

const columns = {
  small: Array(4).fill("flex"),
  medium: Array(8).fill("flex"),
  large: Array(12).fill("flex"),
  xlarge: Array(12).fill("flex"),
};

const rows = {
  small: ["auto", "auto"],
  medium: ["auto", "auto"],
  large: ["auto"],
  xlarge: ["auto"],
};

const areas = {
  small: [
    { name: "menu", start: [0, 0], end: [3, 0] },
    { name: "content", start: [0, 1], end: [3, 1] },
  ],
  medium: [
    { name: "menu", start: [0, 0], end: [3, 0] },
    { name: "content", start: [0, 1], end: [7, 1] },
  ],
  large: [
    { name: "menu", start: [0, 0], end: [2, 0] },
    { name: "content", start: [3, 0], end: [11, 0] },
  ],
  xlarge: [
    { name: "menu", start: [0, 0], end: [2, 0] },
    { name: "content", start: [3, 0], end: [11, 0] },
  ],
};

interface AccountLayoutProps {
  greeting: string;
  title: string;
  error?: string;
  loading: boolean;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  greeting,
  title,
  error,
  loading,
  children,
}) => {
  const onClose = () => location.reload();

  return (
    <React.Fragment>
      <HeroText
        title={
          <Heading
            textAlign={"start"}
            level={"1"}
            alignSelf={"stretch"}
            size="small"
            responsive={false}
            color={"dark"}
            margin={{ top: "medium", bottom: "medium" }}
          >
            {greeting}
          </Heading>
        }
        variant={Theme.DARK}
      />
      <Box
        width={"100%"}
        background={"light-1"}
        pad={{
          top: "xlarge",
          bottom: "xlarge",
        }}
      >
        <Section>
          <ResponsiveGrid rows={rows} columns={columns} areas={areas}>
            <React.Fragment>
              <Box gridArea={"menu"}>
                <AccountMenu />
              </Box>
              <Box gridArea={"content"} height={{ min: "300px" }}>
                <Heading
                  textAlign={"start"}
                  level={"1"}
                  alignSelf={"stretch"}
                  size="small"
                  responsive={false}
                  color={"dark"}
                  margin={{ bottom: "medium" }}
                >
                  {title}
                </Heading>
                {error && (
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
                      <Paragraph>error</Paragraph>
                      <Button
                        label="Close"
                        margin={{ top: "medium" }}
                        color={colorPalette.green}
                        onClick={onClose}
                      />
                    </Card>
                  </Layer>
                )}
                {loading ? (
                  <Box
                    height={{ min: "300px" }}
                    align={"center"}
                    justify={"center"}
                  >
                    <Spinner />
                  </Box>
                ) : (
                  children
                )}
              </Box>
            </React.Fragment>
          </ResponsiveGrid>
        </Section>
      </Box>
    </React.Fragment>
  );
};

export default AccountLayout;
