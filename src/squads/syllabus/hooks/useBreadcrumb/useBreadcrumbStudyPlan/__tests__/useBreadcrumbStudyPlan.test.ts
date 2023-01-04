import { useLocation } from "react-router";
import { SearchEngine } from "src/common/constants/enum";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useBreadcrumbStudyPlan from "../useBreadcrumbStudyPlan";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        ...actual,
        useLocation: jest.fn(),
    };
});

describe(useBreadcrumbStudyPlan.name, () => {
    const inferQueryCourseFn = jest.fn();

    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(
            ({ entity }: Parameters<typeof inferQuery>[0]) => {
                switch (entity) {
                    case "courses":
                        return inferQueryCourseFn;
                    default:
                        throw new Error("Please catch the other queries");
                }
            }
        );
    });

    it("should return correct breadcrumbs for LOs", () => {
        const courseId = "courseId_01";
        (useLocation as jest.Mock).mockReturnValue({
            search: `${SearchEngine.COURSE_ID}=${courseId}`,
        });

        inferQueryCourseFn.mockReturnValue({
            data: { name: "CourseName" },
        });

        const { result } = renderHook(useBreadcrumbStudyPlan);

        expect(result.current.breadcrumbInfos).toEqual([
            {
                translateKey: "resources.courses.name",
                url: "/syllabus/courses",
            },
            {
                name: "CourseName",
                translateKey: "resources.courses.name",
                url: `/syllabus/courses/${courseId}/show`,
            },
        ]);
    });
});
