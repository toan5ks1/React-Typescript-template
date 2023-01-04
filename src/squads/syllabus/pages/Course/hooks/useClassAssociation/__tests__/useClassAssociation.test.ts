import { Lesson_ClassAssociationByClassIdQuery } from "src/squads/syllabus/services/bob/bob-types";

import { act, renderHook } from "@testing-library/react-hooks";
import useStandaloneQuery from "src/squads/syllabus/hooks/data/useStandaloneQuery";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useClassAssociation, {
    ClassAssociation,
} from "src/squads/syllabus/pages/Course/hooks/useClassAssociation/useClassAssociation";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/data/useStandaloneQuery", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/internals/logger/logger");

describe("useClassAssociation", () => {
    const showSnackbar = jest.fn();
    const mockGetClassAssociation = jest.fn();

    beforeEach(() => {
        (useStandaloneQuery as jest.Mock).mockReturnValue({
            classService: { classGetClassAssociationByCourseId: mockGetClassAssociation },
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return class association", async () => {
        const fakeResponseData: Lesson_ClassAssociationByClassIdQuery = {
            class_member_aggregate: { aggregate: { count: 1 } },
            lessons_aggregate: { aggregate: { count: 1 } },
        };

        mockGetClassAssociation.mockResolvedValue(fakeResponseData);

        const {
            result: { current },
        } = renderHook(() => useClassAssociation());

        await act(async () => {
            const associateResponse = await current.getClassAssociation("class_id");
            expect(associateResponse).toEqual<ClassAssociation>({
                lesson: true,
                student: true,
                isQuerySucceed: true,
            });
        });
    });

    it("should return default class association because can not get data from hasura", async () => {
        mockGetClassAssociation.mockResolvedValue(null);

        const {
            result: { current },
        } = renderHook(() => useClassAssociation());

        await act(async () => {
            const associateResponse = await current.getClassAssociation("class_id");
            expect(associateResponse).toEqual<ClassAssociation>({
                lesson: false,
                student: false,
            });
        });
    });

    it("should query fail and show error snackbar", async () => {
        mockGetClassAssociation.mockRejectedValue({});

        const {
            result: { current },
        } = renderHook(() => useClassAssociation());

        await act(async () => {
            await current.getClassAssociation("class_id");
        });

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
    });
});
