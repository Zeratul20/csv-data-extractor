import * as cheerio from "cheerio";

export const extractSocialMediaLinks = ($: cheerio.CheerioAPI): string[] => {
  const socialMediaLinks = new Set<string>();
  const socialMediaPlatforms = [
    "facebook.com",
    "twitter.com",
    "linkedin.com",
    "instagram.com",
    "youtube.com",
    "vimeo.com",
    "pinterest.com",
    "tumblr.com",
    "telegram.org",
    "whatsapp.com",
    "tiktok.com",
    "reddit.com",
    "snapchat.com",
  ];
  $("a[href]").each((i, el) => {
    const href = $(el).attr("href")?.toLowerCase() || "";
    socialMediaPlatforms.forEach((platform) => {
      if (href.includes(platform)) {
        socialMediaLinks.add(href);
      }
    });
  });
  const followUsSelectors = [
    ".follow-us",
    "#follow-us",
    ".social-media",
    "#social-media",
  ];
  followUsSelectors.forEach((selector) => {
    $(selector)
      .find("a[href]")
      .each((i, el) => {
        const href = $(el).attr("href")?.toLowerCase() || "";
        socialMediaPlatforms.forEach((platform) => {
          if (href.includes(platform)) {
            socialMediaLinks.add(href);
          }
        });
      });
  });
  return Array.from(socialMediaLinks);
};
