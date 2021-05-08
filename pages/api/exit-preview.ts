// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (_, res) => {
  if (!res.clearPreviewData) return;

  res.clearPreviewData();

  res.writeHead(307, { Location: "/" });
  res.end();
};
