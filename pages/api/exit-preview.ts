// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default async (_, res) => {
  res.clearPreviewData();

  res.writeHead(307, { Location: "/" });
  res.end();
};
