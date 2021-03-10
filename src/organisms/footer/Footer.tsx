import { Anchor, Box, Grid, Text } from "grommet";
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
  company: SocialIcons;
  a11y_title: string;
  link: Link;
}

export interface FooterProps {
  copyright: RichTextBlock[];
  social_icons: SocialIconProps[];
}

const iconsProps = {
  height: "22px",
  width: "22px",
  color: "white",
};

const SocialIconMapper = (company: SocialIcons) => {
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

  return socialIcons[company];
};

const Social: React.FC<{ socialIcons: SocialIconProps[] }> = ({
  socialIcons,
}) => (
  <Box direction="row" gap="xxsmall" justify="center">
    {socialIcons.map((socialIcon) => (
      <Anchor
        style={{ display: "flex" }}
        a11yTitle={socialIcon.a11y_title}
        href={socialIcon.link.url}
        icon={SocialIconMapper(socialIcon.company)}
      />
    ))}
  </Box>
);

const Footer: React.FC<FooterProps> = ({ copyright, social_icons }) => (
  <Box background="brand-dark" pad={{ top: "small", bottom: "small" }}>
    <Section>
      <Grid columns={"1"} rows={"1"}>
        <Box direction={"row"} align={"center"} justify={"between"}>
          <Text textAlign="center" size="xsmall" style={{ opacity: 0.8 }}>
            {RichText.render(copyright)}
          </Text>
          <Social socialIcons={social_icons} />
        </Box>
      </Grid>
    </Section>
  </Box>
);

export default Footer;
