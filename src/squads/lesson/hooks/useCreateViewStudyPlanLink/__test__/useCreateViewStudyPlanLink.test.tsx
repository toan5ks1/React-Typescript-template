import { Entities } from "src/common/constants/enum";
import { GetPartnerDomainResponseQuery } from "src/squads/lesson/common/types";
import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { GetPartnerDomainRequest } from "manabuf/bob/v1/lessons_pb";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useCreateViewStudyPlanLink, {
    UseCreateViewStudyPlanLinkProps,
} from "src/squads/lesson/hooks/useCreateViewStudyPlanLink";
import useGetLocalProfile from "src/squads/lesson/hooks/useGetLocalProfile";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/lesson/hooks/useGetLocalProfile", () => jest.fn());
jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

const teacherRole = "USER_GROUP_TEACHER";
const adminRole = "USER_GROUP_SCHOOL_ADMIN";

const renderUseCreateViewStudyPlanLink = (
    props: UseCreateViewStudyPlanLinkProps,
    userGroup: string,
    url?: string
) => {
    (useGetLocalProfile as jest.Mock).mockImplementation(() => {
        return { userProfile: { userGroup } };
    });

    (inferQuery as jest.Mock).mockImplementation(
        (__: { entity: "lessonReports"; action: "lessonReportsRetrievePartnerDomain" }) => () => {
            return { data: url ? { domain: url } : "" };
        }
    );

    const {
        result: { current },
    }: RenderHookResult<UseCreateViewStudyPlanLinkProps, string> = renderHook(() =>
        useCreateViewStudyPlanLink(props)
    );

    return current;
};

describe("useCreateViewStudyPlanLink", () => {
    const props: UseCreateViewStudyPlanLinkProps = {
        courseId: "course_id_1",
        studentId: "student_id_1",
    };

    it("should return url with teacher account", () => {
        const url = "http://teacher_app.com/";

        const linkStudyPlan = renderUseCreateViewStudyPlanLink(props, teacherRole, url);

        const expectLink = `${url}#/courseDetail?course_id=${props.courseId}/studentStudyPlan?student_id=${props.studentId}`;
        expect(linkStudyPlan).toBe(expectLink);
    });

    it("should return url with admin account", () => {
        const props: UseCreateViewStudyPlanLinkProps = {
            courseId: "course_id_1",
            studentId: "student_id_1",
        };

        const linkStudyPlan = renderUseCreateViewStudyPlanLink(props, adminRole);

        expect(linkStudyPlan).toBe(
            `/syllabus/${Entities.COURSES}/${props.courseId}/show?tab=CourseShow__studyPlanTab`
        );
    });
});

describe("useCreateViewStudyPlanLink handle error", () => {
    const std = mockWarner();

    it("should fetch partner domain faild", () => {
        const props: UseCreateViewStudyPlanLinkProps = {
            courseId: "course_id_1",
            studentId: "student_id_1",
        };

        const showSnackbar = jest.fn();

        (useGetLocalProfile as jest.Mock).mockImplementation(() => {
            return { userProfile: { userGroup: teacherRole } };
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "lessonReports"; action: "lessonReportsRetrievePartnerDomain" }) =>
                (
                    _params: GetPartnerDomainRequest,
                    options: UseQueryBaseOptions<GetPartnerDomainResponseQuery | undefined>
                ) => {
                    options.onError?.(Error("ERROR LESSON_REPORTS"));
                }
        );

        renderHook(() => useCreateViewStudyPlanLink(props));

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData ERROR LESSON_REPORTS",
            "error"
        );

        expect(std.warn).toBeCalledWith(
            `useCreateViewStudyPlanLink fetchPartnerDomain`,
            Error("ERROR LESSON_REPORTS")
        );
    });

    it("should return url empty with teacher account", () => {
        const props: UseCreateViewStudyPlanLinkProps = {
            courseId: "",
            studentId: "",
        };

        const linkStudyPlan = renderUseCreateViewStudyPlanLink(props, teacherRole);

        expect(linkStudyPlan).toEqual("");
    });

    it("should return url empty with admin", () => {
        const props: UseCreateViewStudyPlanLinkProps = {
            courseId: "",
            studentId: "",
        };

        const linkStudyPlan = renderUseCreateViewStudyPlanLink(props, adminRole);

        expect(linkStudyPlan).toEqual("");
    });
});
