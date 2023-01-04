import { getQueryFields } from "src/test-utils/graphql";

import userQueriesBob from "../user-service-bob.query";

import { GraphqlBody } from "@manabie-com/graphql-client";

const USER_FRAGMENT_VALUES = [
    "user_id",
    "name",
    "email",
    "avatar",
    "phone_number",
    "user_group",
    "country",
];

describe("query: getTitle", () => {
    let gqlQuery: GraphqlBody;

    const variables = {
        user_id: "user_id",
    };

    beforeEach(async () => {
        gqlQuery = await userQueriesBob.getTitle(variables);
    });

    it("should match operation fields", async () => {
        const { operation } = getQueryFields(gqlQuery.query);
        expect(operation?.definitionNode.name?.value).toEqual("UsersTitle");
        expect(operation?.values).toMatchObject([{ users: ["UserAttrs"] }]);
    });

    it("should match fragment fields", () => {
        const { fragment } = getQueryFields(gqlQuery.query);

        expect(fragment?.definitionNode.name.value).toEqual("UserAttrs");
        expect(fragment?.values).toMatchObject(USER_FRAGMENT_VALUES);
    });
});

describe("query: getMany", () => {
    let gqlQuery: GraphqlBody;

    const variables = {
        user_id: "user_id",
    };

    beforeEach(async () => {
        gqlQuery = await userQueriesBob.getMany(variables);
    });

    it("should match operation fields", async () => {
        const { operation } = getQueryFields(gqlQuery.query);

        expect(operation?.definitionNode.name?.value).toEqual("UsersMany");
        expect(operation?.values).toMatchObject([
            { users: ["UserAttrs"] },
            { users_aggregate: [{ aggregate: ["count"] }] },
        ]);
    });

    it("should match fragment fields", () => {
        const { fragment } = getQueryFields(gqlQuery.query);

        expect(fragment?.definitionNode.name.value).toEqual("UserAttrs");
        expect(fragment?.values).toMatchObject(USER_FRAGMENT_VALUES);
    });
});

describe("query: getOne", () => {
    let gqlQuery: GraphqlBody;

    const variables = {
        email: "email@example.com",
        phone_number: "0912345678",
        user_id: "user_id",
    };

    beforeEach(async () => {
        gqlQuery = await userQueriesBob.getOne(variables);
    });

    it("should match operation fields", async () => {
        const { operation } = getQueryFields(gqlQuery.query);

        expect(operation?.definitionNode.name?.value).toEqual("UserByEmail");
        expect(operation?.values).toMatchObject([{ users: ["UserAttrs"] }]);
    });

    it("should match fragment fields", () => {
        const { fragment } = getQueryFields(gqlQuery.query);

        expect(fragment?.definitionNode.name.value).toEqual("UserAttrs");
        expect(fragment?.values).toMatchObject(USER_FRAGMENT_VALUES);
    });
});

describe("query: getUserNameList", () => {
    let gqlQuery: GraphqlBody;

    const variables = {
        user_id: ["user_id_1", "user_id_2"],
    };

    beforeEach(async () => {
        gqlQuery = await userQueriesBob.getUserNameList(variables);
    });

    it("should match operation fields", async () => {
        const { operation } = getQueryFields(gqlQuery.query);

        expect(operation?.definitionNode.name?.value).toEqual("UserNameByIds");
        expect(operation?.values).toMatchObject([{ users: ["user_id", "name"] }]);
    });
});
