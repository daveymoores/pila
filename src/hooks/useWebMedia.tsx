import React from "react";

import { gaEvent, GAEventType } from "../../lib/ga";
import { getLinkUrl, type Link } from "../../lib/prismic-types";

const useWebMedia = (link: Link | undefined) => {
  if (!link) return;

  return async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const url = getLinkUrl(link);
    const target = "target" in link && link.target ? link.target : "_self";
    const name = "name" in link && link.name ? String(link.name) : "download";

    if (link.link_type === "Web" && url) {
      if (typeof window !== "undefined") {
        window.open(url, target)?.focus();
      }
      gaEvent(GAEventType.OUT_BOUND_CLICK, url);
    } else if (link.link_type === "Media" && url) {
      try {
        const { default: fileDownload } = await import("js-file-download");
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Download failed with status ${response.status}`);
        }

        const blob = await response.blob();
        fileDownload(blob, name);
        gaEvent(GAEventType.DOWNLOAD, name);
      } catch {
        console.error("File download failed");
      }
    }
  };
};

export default useWebMedia;
