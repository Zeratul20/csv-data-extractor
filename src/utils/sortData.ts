export const sortByDomain = (data: any[]) => {
  return data.sort((a, b) => a.domain.localeCompare(b.domain));
};
