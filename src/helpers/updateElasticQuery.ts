import { getDomain } from "../utils/getDomain";

export const updateElasticQuery = (
  query: any,
  body: {
    website: string;
    name: string;
    phone: string;
    facebook: string;
  }
) => {
  const { website, name, phone, facebook } = body;
  return {
    ...updateWebsiteQuery(query, website),
    ...updateNameQuery(query, name),
    ...updatePhoneQuery(query, phone),
    ...updateFacebookQuery(query, facebook),
  }.query;
};

const updateWebsiteQuery = (query: any, website: string) => {
  if (!website) return {};
  query.query.bool.should.push({
    term: { "domain.keyword": { value: website, boost: 5 } },
  });
  query.query.bool.should.push({
    wildcard: {
      domain: { value: `*${getDomain(website)}*`, boost: 2 },
    },
  });
  return query;
};

const updateNameQuery = (query: any, name: string) => {
  if (!name) return {};
  query.query.bool.should.push({
    match: {
      company_commercial_name: { query: name, fuzziness: "AUTO", boost: 4 },
    },
  });
  query.query.bool.should.push({
    match: {
      company_legal_name: { query: name, fuzziness: "AUTO", boost: 3 },
    },
  });
  query.query.bool.should.push({
    match: {
      company_all_avalaible_names: {
        query: name,
        fuzziness: "AUTO",
        boost: 2,
      },
    },
  });
  return query;
};

const updatePhoneQuery = (query: any, phone: string) => {
  if (!phone) return {};
  query.query.bool.should.push({
    term: { "phone_numbers.keyword": { value: phone, boost: 4 } },
  });
  query.query.bool.should.push({
    match: { phone_numbers: { query: phone, boost: 1 } },
  });
  return query;
};

const updateFacebookQuery = (query: any, facebook: string) => {
  if (!facebook) return {};
  query.query.bool.should.push({
    match: { social_media_links: { query: facebook, boost: 3 } },
  });
  query.query.bool.should.push({
    wildcard: {
      social_media_links: {
        value: `*facebook.com*${facebook.split("facebook.com")[1] || ""}*`,
        boost: 2,
      },
    },
  });
  return query;
};
