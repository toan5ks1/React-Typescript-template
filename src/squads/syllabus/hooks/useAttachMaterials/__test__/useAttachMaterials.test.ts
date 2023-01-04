import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";
import NsYasuoCourseService from "src/squads/syllabus/services/yasuo/lesson-groups-yasuo/types";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import { act, renderHook } from "@testing-library/react-hooks";
import useAttachMaterials, {
    AttachMaterialsProps,
    UseAttachMaterialsProps,
} from "src/squads/syllabus/hooks/useAttachMaterials/useAttachMaterials";
import { AttachMaterialsToCourseReturn } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo.mutation";

jest.mock("src/squads/syllabus/services/infer-mutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn(),
}));

const props: UseAttachMaterialsProps = { courseId: "courseId", lessonGroupId: "lessonGroupId" };

const fakeFiles = [
    new File([], "20211129A.pdf"),
    new File([], "20211129B.pdf"),
    new File([], "20211129C.pdf"),
];

const mediaIds = ["media_20211129A", "media_20211129B", "media_20211129C"];

const query: AttachMaterialsProps["query"] = {
    files: fakeFiles,
    mediaIds: mediaIds,
};

describe("useAttachMaterials", () => {
    const mutateFn = jest.fn();

    it("should successfully upload a file", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "lessonGroupsYasuo";
                    action: "lessonGroupAttachMaterialsToCourse";
                }) =>
                (
                    _payload: NsYasuoCourseService.AttachMaterialsToCourse,
                    _options?: UseMutationOptions<
                        NsYasuoCourseService.AttachMaterialsToCourse,
                        AttachMaterialsToCourseReturn
                    >
                ) => {
                    return {
                        mutate: mutateFn,
                    };
                }
        );

        const {
            result: { current },
        } = renderHook(() => useAttachMaterials(props));

        act(() => {
            current.onAttachMaterials({
                query: query,
            });
        });

        const [_call] = getLatestCallParams(mutateFn);

        expect(_call).toEqual({
            courseId: "courseId",
            files: fakeFiles,
            lessonGroupId: "lessonGroupId",
            mediaIds: mediaIds,
        });
    });
});
