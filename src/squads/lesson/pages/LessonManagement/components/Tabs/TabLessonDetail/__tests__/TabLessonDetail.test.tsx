import { Features } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { toShortenStr } from "src/common/utils/other";
import { formatDate } from "src/common/utils/time";
import { getTeacherName } from "src/squads/lesson/common/utils";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    createMockMedia,
    mockOneTimeScheduler,
    mockWeeklyRecurringScheduler,
    transformDataToUpsertLessonManagementForTest,
} from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import TabLessonDetail, {
    TabLessonDetailProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tabs/TabLessonDetail";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useDataProvider from "src/hooks/useDataProvider";
import { UsePaginationOptions } from "src/squads/lesson/hooks/data/usePagination";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import { lessonData } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import useUpsertLessonOfLessonManagement, {
    UpsertLessonWithMiddlewareProps,
    UseUpsertLessonOfLessonManagementProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement";

jest.mock(
    "src/squads/lesson/hooks/data/usePagination",
    () => (defaultOption: UsePaginationOptions) => {
        return {
            offset: defaultOption.defaultOffset,
            page: 0,
            limit: defaultOption.defaultLimit,
            rowsPerPage: defaultOption.defaultLimit,
            onPageChange: jest.fn(),
            onRowsPerPageChange: jest.fn(),
        };
    }
);

jest.mock("src/hooks/useDataProvider", () => jest.fn());
jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => jest.fn());
jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => jest.fn());

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement",
    () => {
        return {
            __esModule: true,
            default: jest.fn(),
        };
    }
);

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    const { Features } = jest.requireActual("src/common/constants/enum");

    return {
        __esModule: true,
        default: (toggleName: Features) => {
            if (toggleName === Features.LESSON_CREATE_LESSON_GROUP) return { isEnabled: false };
            return { isEnabled: true };
        },
    };
});

const mockMediasList = createMockMedia();

const mockUpsertLesson = (isSuccess: boolean) => {
    (useUpsertLessonOfLessonManagement as jest.Mock).mockImplementation(
        (props: UseUpsertLessonOfLessonManagementProps) => {
            return {
                upsertLessonWithMiddleWares: (params: UpsertLessonWithMiddlewareProps) => {
                    if (!isSuccess) {
                        props.onError?.(Error("Fake error"));
                        return;
                    }

                    const { data } = params;
                    const submitData = transformDataToUpsertLessonManagementForTest(data, []);
                    props.onSuccess?.(submitData);
                },
            };
        }
    );
};

const renderTabLessonDetail = (props: TabLessonDetailProps) => {
    (useDataProvider as jest.Mock).mockImplementation(() => ({ data: [] }));
    (useAutocompleteReference as jest.Mock).mockImplementation(() => ({
        options: [],
        loading: false,
        setInputVal: jest.fn(),
    }));
    render(
        <TestApp>
            <TestQueryWrapper>
                <TabLessonDetail {...props} />
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<TabLessonDetail /> component renders", () => {
    const props: TabLessonDetailProps = {
        lesson: lessonData,
        isLoadingLesson: false,
        isLoadingMedia: false,
        mediasList: mockMediasList,
        centerName: "Center 1",
        isLoadingCenter: false,
        className: "",
        isLoadingClass: false,
        onUpdatedLesson: jest.fn(),
        scheduler: mockWeeklyRecurringScheduler,
        isLoadingScheduler: false,
    };

    beforeEach(() => {
        mockUpsertLesson(true);
        renderTabLessonDetail(props);
    });

    it("should render title lesson detail", () => {
        expect(screen.getByText("Lesson Detail")).toBeInTheDocument();
    });

    it("should render General Info with all labels and values correctly", () => {
        expect(screen.getByTestId("LessonDetailsGeneralInfo__root")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();

        // lesson date
        expect(screen.getByText("Lesson Date")).toBeInTheDocument();
        expect(
            screen.getByText(formatDate(lessonData.start_time, "yyyy/LL/dd"))
        ).toBeInTheDocument();

        // day of week
        expect(screen.getByText("Day of the week")).toBeInTheDocument();
        expect(screen.getByText("Sunday")).toBeInTheDocument(); // lessonData.start_time is sunday

        // lesson time
        expect(screen.getByText("Start Time")).toBeInTheDocument();
        const startTime = formatDate(lessonData.start_time, "HH:mm");
        expect(screen.getByText(`${startTime}`)).toBeInTheDocument();

        expect(screen.getByText("End Time")).toBeInTheDocument();
        const endTime = formatDate(lessonData.end_time, "HH:mm");
        expect(screen.getByText(`${endTime}`)).toBeInTheDocument();

        // teaching medium
        expect(screen.getByText("Teaching Medium")).toBeInTheDocument();
        expect(screen.getByText("Online")).toBeInTheDocument();

        // teaching method
        expect(screen.getByText("Teaching Method")).toBeInTheDocument();
        expect(screen.getByText("Individual")).toBeInTheDocument();

        // teacher
        expect(screen.getByText("Teacher")).toBeInTheDocument();
        expect(screen.getByText(getTeacherName(lessonData.lessons_teachers))).toBeInTheDocument();

        // center
        expect(screen.getByText("Location")).toBeInTheDocument();
        expect(screen.getByText("Center 1")).toBeInTheDocument();
    });

    it("should render Recurring Settings with 2 fields correctly", () => {
        expect(screen.getByTestId("DetailSectionLessonRecurring__root")).toBeInTheDocument();
        expect(screen.getByText("Saving Option")).toBeInTheDocument();
        expect(screen.getByText("Weekly Recurring")).toBeInTheDocument();
        expect(screen.getByText("Repeat Duration")).toBeInTheDocument();
        expect(screen.getByText("Weekly on Sunday, until 2022/11/30")).toBeInTheDocument();
    });

    it("should render Students table with all columns name and value correctly", () => {
        expect(screen.getByTestId("DetailSectionLessonStudents__root")).toBeInTheDocument();
        expect(
            screen.getByText(`Student Info (${lessonData.lesson_members.length})`)
        ).toBeInTheDocument();

        expect(screen.getByText("Student Name")).toBeInTheDocument();
        expect(screen.getByText("Grade")).toBeInTheDocument();
        expect(screen.getByText("Course")).toBeInTheDocument();
        expect(screen.getByText("Attendance")).toBeInTheDocument();

        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(
            lessonData.lesson_members.length
        );

        lessonData.lesson_members.forEach((member) => {
            expect(screen.getByText(member.user.name)).toBeInTheDocument();
            expect(screen.getByText(`${member.course?.name}`)).toBeInTheDocument();
            expect(
                screen.getByText(String(member.user.student?.current_grade))
            ).toBeInTheDocument();
        });
        expect(screen.getByText("Attend")).toBeInTheDocument();
        expect(screen.getByText("Late")).toBeInTheDocument();
        expect(screen.getByText("Leave Early")).toBeInTheDocument();
    });

    it("should render Material Info correctly", () => {
        expect(screen.getByTestId("LessonDetailsMaterials__root")).toBeInTheDocument();
        expect(screen.getByText("Material Info")).toBeInTheDocument();

        expect(screen.getAllByTestId("ChipFileDescription")).toHaveLength(mockMediasList.length);
        mockMediasList.forEach((media) => {
            const shortenedMediaName = toShortenStr(convertString(media.name), 20);
            expect(screen.getByText(shortenedMediaName)).toBeInTheDocument();
        });
    });
});

describe("<TabLessonDetail /> when scheduler_id is null", () => {
    const props: TabLessonDetailProps = {
        lesson: {
            ...lessonData,
            scheduler_id: null,
        },
        isLoadingLesson: false,
        isLoadingMedia: false,
        mediasList: [],
        centerName: "Center 1",
        isLoadingCenter: false,
        className: "",
        isLoadingClass: false,
        onUpdatedLesson: jest.fn(),
        scheduler: undefined,
        isLoadingScheduler: false,
    };

    it("should render recurring settings is One Time", () => {
        renderTabLessonDetail(props);
        expect(screen.getByText("One Time")).toBeInTheDocument();
    });
});

describe("<TabLessonDetail /> edit lesson", () => {
    const props: TabLessonDetailProps = {
        lesson: lessonData,
        isLoadingLesson: false,
        isLoadingMedia: false,
        mediasList: [],
        centerName: "Center 1",
        isLoadingCenter: false,
        className: "",
        isLoadingClass: false,
        onUpdatedLesson: jest.fn(),
        scheduler: mockOneTimeScheduler,
        isLoadingScheduler: false,
    };

    it("should be an editable lesson", async () => {
        mockUpsertLesson(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => jest.fn());
        renderTabLessonDetail(props);

        const editButton = screen.getByTestId("TabLessonDetail__buttonEdit");
        userEvent.click(editButton);

        await waitFor(() => {
            expect(screen.getByTestId("LessonUpsert__dialog")).toBeVisible();
        });

        const saveButton = screen.getByTestId("LessonUpsertFooter__buttonPublish");
        userEvent.click(saveButton);

        await waitFor(() => expect(props.onUpdatedLesson).toBeCalled());
    });

    it("should get error when edit lesson", async () => {
        const showSnackbar = jest.fn();

        mockUpsertLesson(false);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        renderTabLessonDetail(props);

        const editButton = screen.getByTestId("TabLessonDetail__buttonEdit");
        userEvent.click(editButton);

        await waitFor(() => {
            expect(screen.getByTestId("LessonUpsert__dialog")).toBeVisible();
        });

        const saveButton = screen.getByTestId("LessonUpsertFooter__buttonPublish");
        userEvent.click(saveButton);

        await waitFor(() =>
            expect(showSnackbar).toBeCalledWith(
                "We meet an unknown error. Please try again or contact with Staff.",
                "error"
            )
        );
        expect(props.onUpdatedLesson).not.toBeCalled();
    });
});
