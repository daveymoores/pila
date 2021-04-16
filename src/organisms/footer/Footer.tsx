import { Anchor, Box, Grid, ResponsiveContext, Text } from "grommet";
import {
  CreativeCommons,
  FacebookOption,
  Github,
  Instagram,
  LinkedinOption,
  Medium,
  Slack,
  Twitter,
  Vimeo,
} from "grommet-icons";
import { Link, RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import Section from "../../layout/section/Section";

enum SocialIcons {
  FACEBOOK = "Facebook",
  TWITTER = "Twitter",
  INSTAGRAM = "Instagram",
  GITHUB = "Github",
  CREATIVE_COMMONS = "Creative Commons",
  LINKEDIN = "LinkedIn",
  MEDIUM = "Medium",
  SLACK = "Slack",
  VIMEO = "Vimeo",
}

interface SocialIconProps {
  company?: SocialIcons;
  a11y_title?: string;
  link?: Link;
}

export interface FooterProps {
  copyright?: RichTextBlock[];
  social_icons?: SocialIconProps[];
}

const iconsProps = {
  height: "22px",
  width: "22px",
  color: "white",
};

const SocialIconMapper = (company?: SocialIcons) => {
  const socialIcons = {
    [SocialIcons.FACEBOOK]: <FacebookOption {...iconsProps} />,
    [SocialIcons.TWITTER]: <Twitter {...iconsProps} />,
    [SocialIcons.INSTAGRAM]: <Instagram {...iconsProps} />,
    [SocialIcons.GITHUB]: <Github {...iconsProps} />,
    [SocialIcons.CREATIVE_COMMONS]: <CreativeCommons {...iconsProps} />,
    [SocialIcons.LINKEDIN]: <LinkedinOption {...iconsProps} />,
    [SocialIcons.MEDIUM]: <Medium {...iconsProps} />,
    [SocialIcons.SLACK]: <Slack {...iconsProps} />,
    [SocialIcons.VIMEO]: <Vimeo {...iconsProps} />,
  };

  return company ? socialIcons[company] : undefined;
};

const Social: React.FC<{ socialIcons?: SocialIconProps[] }> = ({
  socialIcons,
}) => (
  <Box direction="row" gap="xxsmall" justify="center">
    {socialIcons &&
      socialIcons.map((socialIcon, index) => (
        <Anchor
          key={index}
          style={{ display: "flex" }}
          a11yTitle={socialIcon?.a11y_title}
          href={socialIcon?.link?.url}
          icon={SocialIconMapper(socialIcon?.company)}
        />
      ))}
  </Box>
);

const Footer: React.FC<FooterProps> = ({ copyright, social_icons }) => {
  const size = React.useContext(ResponsiveContext);
  const isMobileDevice = size !== "large";
  return (
    <Box
      background="brand-dark"
      pad={{ top: "small", bottom: "small" }}
      responsive={false}
    >
      <Section>
        <Grid
          columns={size === "small" ? "auto" : ["auto", "auto"]}
          rows={["auto", "auto"]}
          pad={size === "small" ? { top: "large", bottom: "large" } : undefined}
        >
          <Box
            direction={"row"}
            align={"center"}
            justify={size === "small" ? "center" : "start"}
            pad={size === "small" ? { bottom: "medium" } : undefined}
          >
            {copyright && (
              <Text
                textAlign={size === "small" ? "center" : "start"}
                size={"xsmall"}
                style={{ opacity: 0.8 }}
              >
                {RichText.render(copyright)}
              </Text>
            )}
          </Box>
          <Box align={isMobileDevice ? "center" : "end"}>
            {social_icons && <Social socialIcons={social_icons} />}
          </Box>
        </Grid>
      </Section>
    </Box>
  );
};

export default Footer;
