import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Master_CoursesService } from "src/squads/syllabus/services/master/courses-master-service/types";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useUpsertCourse from "../useUpsertCourse";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useBasicContent", () => {
    return {
        __esModule: true,
        default: () => ({
            school_id: 1,
        }),
    };
});

jest.mock("src/squads/syllabus/services/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const fakeFiles = [new File([], "FileName.png")];
const mutateMockFn = jest.fn();

const mockInferMutation = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (_resource: {
                entity: "media" | "coursesMaster";
                action: "UPLOAD_MEDIA" | "courseCreate";
            }) =>
            () => {
                switch (true) {
                    case _resource.entity === "media" && _resource.action === "UPLOAD_MEDIA":
                        return {
                            mutateAsync: () => {
                                return [
                                    {
                                        gRPC: {
                                            resumableUploadUrl: "resumableUploadUrl",
                                            fileName: "file-name",
                                            downloadUrl: "course_icon",
                                        },
                                        file: fakeFiles[0],
                                    },
                                ];
                            },
                        };
                    case _resource.entity === "coursesMaster" &&
                        _resource.action === "courseCreate":
                        return { mutate: mutateMockFn };
                    default:
                        break;
                }
            }
    );
};

describe(`${useUpsertCourse.name}`, () => {
    beforeEach(() => {
        mockInferMutation();
    });

    it("should create course with correct data", async () => {
        const { result } = renderHook(() => useUpsertCourse());

        const payload = { name: "Course_name", locationIdsList: ["LocationId_1"] };

        await result.current.onCreate(payload, {});

        const [payloadData] = getLatestCallParams(mutateMockFn);
        expect(payloadData).toEqual<NsSyllabus_Master_CoursesService.UpsertCourses>({
            chapter_ids: [],
            icon: undefined,
            display_order: 1,
            school_id: 1,
            ...payload,
        });
    });

    it("should update course with correct data", async () => {
        const { result } = renderHook(() => useUpsertCourse({ isEdit: true }));

        const payload: Omit<
            NsSyllabus_Master_CoursesService.UpsertCourses,
            "school_id" | "display_order" | "chapter_ids"
        > = {
            name: "CourseName",
            course_id: "CourseId_1",
            icon: "CourseIcon",
            locationIdsList: ["LocationId_1"],
            files: fakeFiles,
        };

        await result.current.onEdit(payload, {});

        const [payloadData] = getLatestCallParams(mutateMockFn);

        expect(payloadData).toEqual<NsSyllabus_Master_CoursesService.UpsertCourses>({
            ...payload,
            chapter_ids: [],
            display_order: 1,
            school_id: 1,
            icon: "course_icon",
        });
    });
});
