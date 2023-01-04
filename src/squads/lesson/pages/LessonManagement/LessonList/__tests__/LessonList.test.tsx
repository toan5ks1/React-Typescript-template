import { setupAndMockDataForCreatingLesson } from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LessonList from "src/squads/lesson/pages/LessonManagement/LessonList";
import TestApp from "src/squads/lesson/test-utils/TestApp";
import TestingRouter from "src/squads/lesson/test-utils/TestingRouter";

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useLessonList", () => {
    const val = {
        isLoadingTeacher: false,
        isLoadingCenter: false,
        isLoadingLesson: false,
        isSearching: true,
        refreshPage: jest.fn(),
        lessons: [],
        onSearch: () => {}, // TODO: @bao I will implement it in function search
        onFilter: () => {}, // TODO: @bao I will implement it in function filter
    };

    return () => val;
});

jest.mock("src/squads/lesson/hooks/useGetPartnerFormConfigById", () => {
    const val = [
        {
            fields: [
                {
                    label: {
                        i18n: {
                            fallback_language: "ja",
                            translations: {
                                en: "Homework Submission",
                                ja: "課題",
                                vi: "Homework Submission",
                            },
                        },
                    },
                    field_id: "homework_submission_status",
                    value_type: "VALUE_TYPE_STRING",
                    is_required: true,
                    display_config: {
                        size: {},
                    },
                    component_props: {
                        required: true,
                    },
                    component_config: {
                        type: "TEXT_FIELD_PERCENTAGE",
                    },
                },
            ],
            section_id: "homework_section_id",
            section_name: "homework",
        },
    ];
    return () => val;
});

jest.mock("src/hooks/useGlobalLocations", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: true }),
    };
});

jest.mock("src/squads/lesson/hooks/useConvertMedia", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement",
    () => {
        return {
            __esModule: true,
            default: jest.fn(),
        };
    }
);

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useLessonStudentInfoListFilter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useGetManyLocations", () => {
    return {
        __esModule: true,
        default: (locationIds: string[]) => {
            return {
                data: locationIds.map((id) => ({ location_id: id, name: "Center Name 01" })),
                isLoading: false,
            };
        },
    };
});

const renderLessonManagementWrapper = () => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestingRouter>
                    <MuiPickersUtilsProvider>
                        <LessonList />
                    </MuiPickersUtilsProvider>
                </TestingRouter>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<LessonList /> testing", () => {
    let wrapper: RenderResult;
    beforeEach(() => {
        setupAndMockDataForCreatingLesson();
        wrapper = renderLessonManagementWrapper();
    });

    it("should display LessonList", () => {
        expect(wrapper.getByTestId("LessonList__root")).toBeInTheDocument();
    });

    it("should close lesson upsert dialog", () => {
        const addButton = wrapper.getByTestId("TabLessonList__buttonAdd");
        userEvent.click(addButton);

        const closeBtn = wrapper.getByTestId("DialogFullScreen__buttonClose");
        userEvent.click(closeBtn);

        const leaveBtn = wrapper.getByText("Leave");
        userEvent.click(leaveBtn);

        expect(wrapper.queryByTestId("LessonUpsert__dialog")).not.toBeInTheDocument();
    });

    it("should open lesson upsert dialog", () => {
        const pastLessonButton = wrapper.getByText("Past Lessons");
        userEvent.click(pastLessonButton);

        const addButton = wrapper.getByTestId("TabLessonList__buttonAdd");
        userEvent.click(addButton);

        expect(wrapper.queryByTestId("LessonUpsert__dialog")).toBeInTheDocument();
    });

    it("should render NoResultPage when there is no data after searching", () => {
        expect(wrapper.getByTestId("NoResultPage__root")).toBeInTheDocument();
    });
});
