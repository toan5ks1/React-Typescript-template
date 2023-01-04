import { TeacherManyQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { teachersService } from "src/squads/lesson/service/bob/teachers-service/teachers-service";
import { mockTeachersManyList } from "src/squads/lesson/test-utils/lesson-management";

import teachersQueriesBob from "src/squads/lesson/service/bob/teachers-service/teachers-bob.query";

jest.mock("src/squads/lesson/service/bob/teachers-service/teachers-bob.query", () => ({
    __esModule: true,
    default: {
        getMany: jest.fn(),
    },
}));

describe("teachers-service", () => {
    it("should call query teachersGetMany correctly", async () => {
        (teachersQueriesBob.getMany as jest.Mock).mockResolvedValue(mockTeachersManyList);
        const variables: TeacherManyQueryVariables = {
            school_id: 1,
            user_id: "user_id",
        };

        const response = await teachersService.query.teachersGetMany(variables);

        expect(teachersQueriesBob.getMany).toBeCalledWith(variables);
        expect(response).toEqual(mockTeachersManyList);
    });

    it("should not call query teachersGetMany when user_id is undefined", async () => {
        const invalidQueryVariable: TeacherManyQueryVariables = {
            user_id: undefined,
        };
        (teachersQueriesBob.getMany as jest.Mock).mockResolvedValue(mockTeachersManyList);

        await expect(async () => {
            await teachersService.query.teachersGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "teachersGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "user_id" }],
            name: "InvalidParamError",
        });

        expect(teachersQueriesBob.getMany).not.toBeCalled();
    });

    it("should not call query teachersGetMany when user_id is an empty string", async () => {
        const invalidQueryVariable: TeacherManyQueryVariables = {
            user_id: "",
        };
        (teachersQueriesBob.getMany as jest.Mock).mockResolvedValue(mockTeachersManyList);

        await expect(async () => {
            await teachersService.query.teachersGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "teachersGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "user_id" }],
            name: "InvalidParamError",
        });
        expect(teachersQueriesBob.getMany).not.toBeCalled();
    });

    it("should not call query teachersGetMany when user_id is an empty array", async () => {
        const invalidQueryVariable: TeacherManyQueryVariables = {
            user_id: [],
        };
        (teachersQueriesBob.getMany as jest.Mock).mockResolvedValue(mockTeachersManyList);

        await expect(async () => {
            await teachersService.query.teachersGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "teachersGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "user_id" }],
            name: "InvalidParamError",
        });

        expect(teachersQueriesBob.getMany).not.toBeCalled();
    });
});
