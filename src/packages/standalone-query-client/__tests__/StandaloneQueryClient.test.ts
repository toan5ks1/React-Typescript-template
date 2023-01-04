import { QueryClient } from "react-query";

import StandaloneQueryClient from "../StandaloneQueryClient";

describe("StandaloneQueryClient", () => {
    const logger = {
        log: (data: any) => {
            window.console.log(data);
        },
        warn: (data: any) => {
            window.console.warn(data);
        },
        error: (data: any) => {
            window.console.error(data);
        },
    };

    const queryClient = new QueryClient();
    const standaloneQueryClient = new StandaloneQueryClient(queryClient, logger);

    it("should return function createStandaloneQuery", () => {
        const service = {
            studentParent: {
                query: {
                    LIST_WITH_FILTER: jest.fn(),
                },
            },
        };
        expect(typeof standaloneQueryClient.createStandaloneQuery(service)).toBe("function");
    });

    it("should create and run inferStandaloneQuery with service", async () => {
        const result = { data: "test" };

        const service = {
            studentParent: {
                query: {
                    LIST_WITH_FILTER: jest.fn().mockResolvedValue(result),
                },
            },
        };
        const inferStandaloneQuery = standaloneQueryClient.createStandaloneQuery(service);

        const resp = await inferStandaloneQuery({
            entity: "studentParent",
            action: "LIST_WITH_FILTER",
        })({});

        expect(service.studentParent.query.LIST_WITH_FILTER).toBeCalledTimes(1);
        expect(resp).toMatchObject(result);
    });

    it("should create inferStandaloneQuery and throw error ", async () => {
        const service = {
            studentParent: {
                query: {
                    LIST_WITH_FILTER: jest.fn().mockRejectedValue("error"),
                },
            },
        };

        const warn = jest.spyOn(logger, "warn");

        const inferStandaloneQuery = standaloneQueryClient.createStandaloneQuery(service);

        try {
            await inferStandaloneQuery({
                entity: "studentParent",
                action: "LIST_WITH_FILTER",
            })({});
        } catch (error) {}

        expect(warn).toBeCalledTimes(1);
        expect(warn).toBeCalledWith(
            'createStandaloneQuery ["studentParent_LIST_WITH_FILTER",{"request":{}}]',
            "error"
        );

        warn.mockRestore();
    });
});
