export const getDomain = (website: string | undefined): string | undefined => {
  if (!website) return undefined;
  website = website.replace("https://", "").replace("http://", "");
};
