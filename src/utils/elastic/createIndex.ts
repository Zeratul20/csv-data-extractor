export const createElasticIndex = async (esClient: any) => {
  try {
    await esClient.indices.create({
      index: "companies",
      body: {
        mappings: {
          properties: {
            domain: { type: "keyword" },
            company_commercial_name: { type: "text" },
            company_legal_name: { type: "text" },
            company_all_available_names: { type: "text" },
            phone_numbers: { type: "text" },
            social_media_links: { type: "text" },
            address: { type: "text" },
          },
        },
      },
    });
    console.log("Index created");
  } catch (error: any) {
    if (
      error.meta &&
      error.meta.body &&
      error.meta.body.error.type === "resource_already_exists_exception"
    ) {
      console.log("Index already exists");
    } else {
      console.error("Error creating index:", error);
    }
  }
};
