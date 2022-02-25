import { Box } from "grommet";
import NextImage from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import Logo from "../../atoms/logo/Logo";
import { NavigationTheme } from "../navigation/Navigation";

interface LogosProps {
  theme: NavigationTheme;
}

const Logos: React.FC<LogosProps> = ({ theme }) => {
  const router = useRouter();

  return (
    <StyledLogoBox
      direction="column"
      align="start"
      onClick={() => router.push(`/`)}
    >
      <NextImage
        src={
          theme === NavigationTheme.DARK ? "/OECD_20cm_w.png" : "/OECD_20cm.png"
        }
        priority
        layout="fixed"
        objectFit="contain"
        width={130}
        height={42}
      />
      <StyledLogo />
    </StyledLogoBox>
  );
};

const StyledLogoBox = styled(Box)`
  margin-right: 40px;
  margin-top: 35px;
`;

const StyledLogo = styled(Logo)`
  width: 130px;
  height: 60px;
`;

export default Logos;
