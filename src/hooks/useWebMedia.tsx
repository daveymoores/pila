import { Link } from "prismic-reactjs";
import React from "react";

const useWebMedia = (link: Link | undefined) => {
  if (!link) return;

  return async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    if (link.link_type === "Web") {
      window && window.open(link.url, link.target || "_self")?.focus();
    } else if (link.link_type === "Media") {
      try {
        const { default: Axios } = await import("axios");
        const { default: fileDownload } = await import("js-file-download");

        Axios.get(link.url as string, {
          responseType: "blob",
        }).then((res) => {
          fileDownload(res.data, link.name as string);
        });
      } catch {
        console.error("File download failed");
      }
    }
  };
};

export default useWebMedia;
