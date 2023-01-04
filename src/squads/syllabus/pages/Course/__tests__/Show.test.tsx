// TODO: Refactor this test
import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import permission from "src/squads/syllabus/internals/permission";
import { ResourceActions } from "src/squads/syllabus/models/resource";
import { Lesson_CoursesOneQuery } from "src/squads/syllabus/services/bob/bob-types";
import { inferQueryPagination, inferQuery } from "src/squads/syllabus/services/infer-query";
import { mockLessonGroups } from "src/squads/syllabus/test-utils/lessons";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";
import { PjOwner } from "src/squads/syllabus/typings/configuration";

import { render, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import Show from "src/squads/syllabus/pages/Course/Show";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/internals/configuration");

jest.mock("src/squads/syllabus/internals/permission", () => {
    const originalModule = jest.requireActual("src/squads/syllabus/internals/permission");
    return {
        __esModule: true,
        default: {
            ...originalModule,
            can: jest.fn(originalModule.can),
        },
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

const mockPagination = createFakePagination();

jest.mock("src/squads/syllabus/hooks/useLessonGroupContainLesson", () => {
    return {
        __esModule: true,
        default: () => ({
            lessonGroupListQuery: mockLessonGroups,
            loading: false,
            pagination: mockPagination,
            updateLessonGroups: jest.fn(),
        }),
    };
});

jest.mock("react-redux", () => ({
    __esModule: true,
    ...(jest.requireActual("react-redux") as object),
    useSelector: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    const { Features } = jest.requireActual("src/common/constants/enum");

    return (...params: Parameters<typeof useFeatureToggle>) => {
        const [toggleName] = params;

        if (toggleName === Features.STUDY_PLAN_MANAGEMENT) {
            return {
                isEnabled: true,
            };
        }

        if (toggleName === Features.COURSE_MANAGEMENT_ADD_LOCATION_FIELD) {
            return {
                isEnabled: true,
            };
        }

        if (toggleName === Features.LESSON_COURSE_MANAGEMENT_CLASS_MANAGEMENT) {
            return {
                isEnabled: true,
            };
        }

        throw new Error("Should catch the other feature flags");
    };
});

jest.mock("src/squads/syllabus/pages/Course/hooks/useGetCourseLocations", () => {
    return {
        __esModule: true,
        default: () => ({
            locationIds: "location_id1",
            locations: [
                {
                    location_id: "location_id1",
                    name: "location 1",
                },
            ],
            isLoadingLocationIds: false,
            isLoadingLocations: false,
            updateCourseLocations: jest.fn(),
        }),
    };
});

export const mockCourseData: ArrayElement<Lesson_CoursesOneQuery["courses"]> = {
    course_id: "course_id_1",
    name: "Course 01",
    course_books: [],
    school_id: 0,
};

describe("<Show /> course manabie env", () => {
    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    beforeEach(() => {
        (appConfigs.getCurrentPjOwner as jest.Mock).mockReturnValue(PjOwner.MANABIE);
        (permission.can as jest.Mock).mockImplementation((resource, resourceAction) => {
            return resourceAction === ResourceActions.LIST && resource === Entities.LESSON_GROUPS;
        });
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: mockCourseData,
            isLoading: false,
        }));

        const pageTitlePlaceholder = document.createElement("div");

        document.body.append(pageTitlePlaceholder);

        render(<Show />, { wrapper: TestAppWithQueryClient });
    });

    it("should render exactly title first tab", () => {
        expect(screen.getByTestId("LessonTab__title").textContent).toContain("Upload materials");
    });

    it("should render exactly tabs", () => {
        const tabList = screen.getByRole("tablist").children;
        expect(tabList).toHaveLength(4);
        expect(tabList[0]).toHaveTextContent("Lesson");
        expect(tabList[1]).toHaveTextContent("Study Plan");
        expect(tabList[2]).toHaveTextContent("Class");
        expect(tabList[3]).toHaveTextContent("Setting");
    });

    it("should render course name", () => {
        expect(screen.getByText("Course 01")).toBeInTheDocument();
    });
});

describe("<Show /> course synersia env", () => {
    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    beforeEach(() => {
        (appConfigs.getCurrentPjOwner as jest.Mock).mockReturnValue(PjOwner.SYNERSIA);
        (permission.can as jest.Mock).mockReturnValue(false);
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: mockCourseData,
            isLoading: false,
        }));

        // Study plan
        (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
            data: [],
            result: {
                isLoading: false,
            },
            resetPaginationOffset: jest.fn(),
        }));

        render(<Show />, { wrapper: TestAppWithQueryClient });
    });

    it("should render exactly tabs", () => {
        expect(screen.getByRole("tablist").children).toHaveLength(3);
    });

    it("should render course name", () => {
        expect(screen.getByText("Course 01")).toBeInTheDocument();
    });
});
