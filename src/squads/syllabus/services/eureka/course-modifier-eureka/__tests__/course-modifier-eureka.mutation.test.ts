import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { CourseModifierServicePromiseClient } from "manabuf/eureka/v1/course_modifier_grpc_web_pb";

import courseModifierServiceEureka from "../course-modifier-eureka.mutation";
import {
    createAddBooksToCourseRequest,
    createDuplicateBookRequest,
} from "../course-modifier-eureka.request";
import { NsEurekaCourseModifierService } from "../types";
import { createMockDataAddBooksToCourse } from "./data";

jest.mock("src/internals/feature-controller");

jest.mock("manabuf/eureka/v1/course_modifier_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/eureka/v1/course_modifier_grpc_web_pb");

    actual.CourseModifierServicePromiseClient.prototype.duplicateBook = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe(`test for duplicate book ${courseModifierServiceEureka.duplicateBook.name}`, () => {
    const payload: NsEurekaCourseModifierService.DuplicateBook = {
        bookId: "id_01",
        bookName: "bookName_duplicate",
    };

    beforeEach(() => {
        (CourseModifierServicePromiseClient.prototype.duplicateBook as jest.Mock).mockResolvedValue(
            fakeReturn
        );
    });

    it("should return correct data after success", async () => {
        const resp = await courseModifierServiceEureka.duplicateBook(payload);

        expect(resp).toEqual(fakeReturn.toObject());
    });

    it("should call endpoint with correct payload", async () => {
        await courseModifierServiceEureka.duplicateBook(payload);

        expect(CourseModifierServicePromiseClient.prototype.duplicateBook).toBeCalledWith(
            createDuplicateBookRequest(payload)
        );
    });
});

describe(courseModifierServiceEureka.addBooksToCourse.name, () => {
    it("should return correct data after success", async () => {
        const response = genId();
        const payload = createMockDataAddBooksToCourse();

        createMockClass<CourseModifierServicePromiseClient>(CourseModifierServicePromiseClient, {
            addBooks: () => createFakeProtoResponse(response),
        });

        const request = createAddBooksToCourseRequest(payload);

        const result = await courseModifierServiceEureka.addBooksToCourse(payload);

        expect(result).toEqual(response);
        expect(CourseModifierServicePromiseClient.prototype.addBooks).toBeCalledWith(request);
    });
});
