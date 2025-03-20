export const insertElasticCompanies = async (esClient: any, companies: any[]) => {
  const bulkData = companies.flatMap((doc: any) => [
    { index: { _index: "companies" } },
    doc,
  ]);

  try {
    const response = await esClient.bulk({ refresh: true, body: bulkData });
    console.log("RESPONSE: ", response)
    // console.log("Inserted:", body.items.length, "documents");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};
