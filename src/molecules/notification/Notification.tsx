import { Box } from "grommet";
import { CircleInformation } from "grommet-icons";
import { RichText, RichTextBlock } from "prismic-reactjs";
import React from "react";

import Section from "../../layout/section/Section";
import { colorPalette } from "../../theme/pila";

export interface NotificationLinkedProps {
  notification: {
    data: NotificationProps;
  };
}

export interface NotificationProps {
  notificationId?: string;
  body?: RichTextBlock[];
  showGlobal?: boolean;
}

const Notification: React.FC<NotificationProps> = ({ body }) => {
  return (
    <Box
      background={colorPalette.dark_blue}
      pad={{ vertical: "medium" }}
      responsive={false}
    >
      <Section>
        <Box direction={"row"} align={"center"}>
          <CircleInformation />
          {body && (
            <Box
              pad={{ left: "medium" }}
              style={{ fontSize: "14px", lineHeight: "18px" }}
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
