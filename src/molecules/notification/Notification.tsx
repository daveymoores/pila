import { Box } from "grommet";
import { CircleInformation } from "grommet-icons";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import CustomType from "../../../types/CustomType";
import Section from "../../layout/section/Section";
import { colorPalette, fontWeights } from "../../theme/pila";

export interface NotificationProps {
  notificationId?: string;
  body?: RichTextBlock[];
  showGlobal?: boolean;
  document?: CustomType<any>;
}

const Notification: React.FC<NotificationProps> = ({ body }) => {
  return (
    <Box
      background={colorPalette.night_blue}
      pad={{ vertical: "medium" }}
      responsive={false}
    >
      <Section>
        <Box direction={"row"} align={"center"}>
          <CircleInformation />
          {body && (
            <Box
              pad={{ left: "medium" }}
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                fontWeight: fontWeights.bold,
              }}
            >
              {RichText.render(body)}
            </Box>
          )}
        </Box>
      </Section>
    </Box>
  );
};

export default Notification;
