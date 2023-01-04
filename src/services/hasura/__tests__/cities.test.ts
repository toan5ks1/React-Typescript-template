import { ProviderTypes } from "src/common/constants/enum";
import citiesService, { CitiesServiceParams } from "src/services/hasura/cities";
import { getQueryFields } from "src/test-utils/graphql";
import { isTextIncludeMultipleValue } from "src/test-utils/query";

describe("cities queries should return the correct fragment", () => {
    const citiesServiceProps: { params: CitiesServiceParams; queryName: string }[] = [
        {
            params: {
                type: ProviderTypes.ONE,
                payload: {
                    city_id: 1,
                },
            },
            queryName: "CityOne",
        },
        {
            params: {
                type: ProviderTypes.MANY_REFERENCE,
                payload: {
                    filter: {
                        city_id: 1,
                        name: "name",
                        country: "COUNTRY_VN",
                    },
                },
            },
            queryName: "CityMany",
        },
        {
            params: {
                type: ProviderTypes.LIST,
                payload: {
                    filter: {
                        city_id: 1,
                        name: "name",
                        country: "COUNTRY_VN",
                    },
                },
            },
            queryName: "CityMany",
        },
        {
            params: {
                type: ProviderTypes.MANY,
                payload: {
                    city_id: 1,
                    ids: [1],
                    name: "name",
                    country: "COUNTRY_VN",
                },
            },
            queryName: "CityMany",
        },
    ];

    it("cities queries should return fragment properties", async () => {
        citiesServiceProps.forEach(async ({ params, queryName }) => {
            const gqlQuery = await citiesService(params)["query"];

            const { operation, fragment } = getQueryFields(gqlQuery);

            expect(operation?.definitionNode.name?.value).toEqual(queryName);
            const queryString = JSON.stringify(operation?.values[0]);
            const queryFields = ["CityAttrs"];
            expect(isTextIncludeMultipleValue(queryString, queryFields)).toBe(true);

            expect(fragment?.definitionNode.name.value).toEqual("CityAttrs");
            expect(fragment?.values).toMatchObject(["city_id", "country", "display_order", "name"]);
        });
    });
});
