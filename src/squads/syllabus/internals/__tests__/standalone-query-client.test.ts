import standaloneQueryClient from "../standalone-query-client";

describe(standaloneQueryClient.createStandaloneQuery.name, () => {
    it("should createStandaloneQuery and using it without crash", async () => {
        const queries = standaloneQueryClient.createStandaloneQuery({
            media: {
                query: {
                    getOne: () => Promise.resolve(),
                },
            },
        });

        const fetchOneQuery = queries({
            entity: "media",
            action: "getOne",
        });

        await fetchOneQuery(undefined);
    });
});
