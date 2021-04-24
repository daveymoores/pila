import styled from "styled-components";

const MobileOnly = styled.div`
  width: 100%;
  @media only screen and (min-width: 601px) {
    display: none;
  }
`;

const TabletOnly = styled.div`
  width: 100%;
  display: none;
  @media only screen and (min-width: 601px) and (max-width: 900px) {
    display: block;
  }

  @media only screen and (min-width: 901px) {
    display: none;
  }
`;

const TabletUp = styled.div`
  width: 100%;
  display: none;
  @media only screen and (min-width: 601px) {
    display: block;
  }
`;

const DesktopUp = styled.div`
  width: 100%;
  display: none;
  @media only screen and (min-width: 900px) {
    display: block;
  }
`;

export { DesktopUp, MobileOnly, TabletOnly, TabletUp };
