const getFileExtension = (url: string): string =>
  url.substr(url.lastIndexOf(".") + 1).toUpperCase();

export default getFileExtension;
