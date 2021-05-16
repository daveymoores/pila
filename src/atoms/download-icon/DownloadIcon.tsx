import { Box } from "grommet";
import { Download } from "grommet-icons";
import React from "react";

import getFileExtension from "../../../helpers/get-file-extension/getFileExtension";
import { colorPalette } from "../../theme/pila";

const DownloadIcon: React.FC<{ url?: string }> = ({ url }) => {
  return (
    <Box align={"center"} justify={"start"}>
      <span style={{ fontSize: "10px", padding: "4px 0px 6px" }}>
        {url ? getFileExtension(url) : "DOWNLOAD"}
      </span>
      <Download size="15px" color={colorPalette.white} />
    </Box>
  );
};

export default DownloadIcon;
