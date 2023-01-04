import { formatDate } from "src/common/utils/time";
import {
    emptyValue,
    getDurationBetweenTwoDates,
    getTeacherName,
} from "src/squads/lesson/common/utils";

import DetailSectionLessonGeneralInfo, {
    DetailSectionLessonGeneralInfoProps,
} from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonGeneralInfo";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import {
    groupLessonData,
    lessonData,
    mockLessonDetailData,
} from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import TestApp from "src/squads/lesson/test-utils/TestApp";

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: true }),
}));

const renderLessonDetailsGeneralInfo = (props: DetailSectionLessonGeneralInfoProps) => {
    return render(
        <TestApp>
            <TranslationProvider>
                <DetailSectionLessonGeneralInfo {...props} />
            </TranslationProvider>
        </TestApp>
    );
};
describe("<DetailSectionLessonGeneralInfo /> component renders", () => {
    const props: DetailSectionLessonGeneralInfoProps = {
        lesson: lessonData,
        isLoadingGeneralInfo: false,
        centerName: "Center 1",
        isLoadingCenter: false,
        className: "",
        isLoadingClass: false,
    };

    beforeEach(() => {
        renderLessonDetailsGeneralInfo(props);
    });

    it("should render General Info title", () => {
        expect(screen.getByTestId("LessonDetailsGeneralInfo__root")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
    });

    it("should render lesson date correctly", () => {
        expect(screen.getByText("Lesson Date")).toBeInTheDocument();
        expect(
            screen.getByText(formatDate(lessonData.start_time, "yyyy/LL/dd"))
        ).toBeInTheDocument();
    });

    it("should render day of week correctly", () => {
        expect(screen.getByText("Day of the week")).toBeInTheDocument();
        expect(screen.getByText("Sunday")).toBeInTheDocument(); // lessonData.start_time is sunday
    });

    it("should render lesson time correctly", () => {
        expect(screen.getByText("Start Time")).toBeInTheDocument();
        const startTime = formatDate(lessonData.start_time, "HH:mm");
        expect(screen.getByText(`${startTime}`)).toBeInTheDocument();

        expect(screen.getByText("End Time")).toBeInTheDocument();
        const endTime = formatDate(lessonData.end_time, "HH:mm");
        expect(screen.getByText(`${endTime}`)).toBeInTheDocument();
    });

    it("should render teaching medium", () => {
        expect(screen.getByText("Teaching Medium")).toBeInTheDocument();
        expect(screen.getByText("Online")).toBeInTheDocument();
    });

    it("should render teaching method", () => {
        expect(screen.getByText("Teaching Method")).toBeInTheDocument();
        expect(screen.getByText("Individual")).toBeInTheDocument();
    });

    it("should render teachers correctly", () => {
        expect(screen.getByText("Teacher")).toBeInTheDocument();
        expect(screen.getByText(getTeacherName(lessonData.lessons_teachers))).toBeInTheDocument();
    });

    it("should render center correctly", () => {
        expect(screen.getByText("Location")).toBeInTheDocument();
        expect(screen.getByText("Center 1")).toBeInTheDocument();
    });

    it("should render total time correctly", () => {
        const totalTime = getDurationBetweenTwoDates(lessonData.start_time, lessonData.end_time);
        expect(screen.getByText("Total Time")).toBeInTheDocument();
        expect(screen.getByText(`${totalTime} minutes`)).toBeInTheDocument();
    });

    it("should not render course and class when teaching method is LESSON_TEACHING_METHOD_INDIVIDUAL", () => {
        expect(screen.queryByTestId("LessonDetailsGeneralInfo__course")).not.toBeInTheDocument();
        expect(screen.queryByTestId("LessonDetailsGeneralInfo__class")).not.toBeInTheDocument();
    });
});

describe("<LessonDetailsGeneralInfo /> component renders when teaching method is LESSON_TEACHING_METHOD_GROUP", () => {
    it("should render course and class", () => {
        const props: DetailSectionLessonGeneralInfoProps = {
            lesson: groupLessonData,
            isLoadingGeneralInfo: false,
            centerName: "Center 1",
            isLoadingCenter: false,
            className: "Class Name 1",
            isLoadingClass: false,
        };
        renderLessonDetailsGeneralInfo(props);

        expect(screen.getByTestId("DetailSectionLessonGeneralInfo__course")).toBeInTheDocument();
        expect(screen.getByTestId("DetailSectionLessonGeneralInfo__course")).toHaveTextContent(
            "Course name 01"
        );
        expect(screen.getByTestId("DetailSectionLessonGeneralInfo__class")).toBeInTheDocument();
        expect(screen.getByTestId("DetailSectionLessonGeneralInfo__class")).toHaveTextContent(
            "Class Name 1"
        );
    });

    it("should render class with grey color when class is null", () => {
        const props: DetailSectionLessonGeneralInfoProps = {
            lesson: groupLessonData,
            isLoadingGeneralInfo: false,
            centerName: "Center 1",
            isLoadingCenter: false,
            className: "--",
            isLoadingClass: false,
        };
        renderLessonDetailsGeneralInfo(props);

        expect(screen.getByTestId("DetailSectionLessonGeneralInfo__class")).toHaveStyle(
            "color: rgb(189, 189, 189);"
        );
    });
});

describe("<LessonDetailsGeneralInfo /> component renders when loading", () => {
    const props: DetailSectionLessonGeneralInfoProps = {
        lesson: lessonData,
        isLoadingGeneralInfo: true,
        centerName: "Center 1",
        isLoadingCenter: true,
        className: "",
        isLoadingClass: false,
    };

    it("should show loading", () => {
        renderLessonDetailsGeneralInfo(props);
        expect(screen.getAllByTestId("TypographyWithValue__skeleton")).toHaveLength(9);
    });
});
describe("<LessonDetailsGeneralInfo /> missing field data", () => {
    const props: DetailSectionLessonGeneralInfoProps = {
        lesson: mockLessonDetailData(["teacherNames"]),
        isLoadingGeneralInfo: false,
        centerName: "Center 1",
        isLoadingCenter: false,
        className: "",
        isLoadingClass: false,
    };

    it("should render empty value at teacher when response data empty", () => {
        renderLessonDetailsGeneralInfo(props);
        expect(screen.getByTestId("LessonDetailsGeneralInfo__teachers")).toHaveTextContent(
            emptyValue
        );
    });
});
