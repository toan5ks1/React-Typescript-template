import { NsYasuoCourseService } from "src/services/yasuo/course-service-yasuo";
import { AttachMaterialsToCourseReturn } from "src/services/yasuo/course-service-yasuo/course-service-yasuo";

import { mockWarner } from "../../../test-utils/warner";
import useAttachMaterials, {
    AttachMaterialsProps,
    UseAttachMaterialsProps,
} from "../useAttachMaterials";

import { act, renderHook } from "@testing-library/react-hooks";
import useMutationV2, { UseMutationOptions, UseMutationParams } from "src/hooks/data/useMutationV2";

jest.mock("src/hooks/data/useMutationV2", () => jest.fn());

jest.mock("src/hooks/useDataProvider", () => {
    const dataProvider = {
        getList: () => {
            return { data: [], total: 0 };
        },
    };

    return () => dataProvider;
});

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

    mockWarner();

    const courseMaterials: NsYasuoCourseService.AttachMaterialsToCourse = {
        courseId: "courseId",
        mediaIds: mediaIds,
        lessonGroupId: "lessonGroupId",
        files: fakeFiles,
    };

    const returnMediaIds: AttachMaterialsToCourseReturn = {
        newMediaIds: mediaIds,
        mediaIds: [],
    };

    it("should successfully upload a file", async () => {
        (useMutationV2 as jest.Mock).mockImplementation(
            (
                _resource: UseMutationParams,
                options?: UseMutationOptions<
                    NsYasuoCourseService.AttachMaterialsToCourse,
                    AttachMaterialsToCourseReturn
                >
            ) => {
                void options?.onSuccess?.(returnMediaIds, courseMaterials, undefined);
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

        expect(mutateFn).toBeCalledWith(
            {
                courseId: "courseId",
                files: fakeFiles,
                lessonGroupId: "lessonGroupId",
                mediaIds: mediaIds,
            },
            { onError: expect.any(Function), onSuccess: expect.any(Function) }
        );
    });
});
