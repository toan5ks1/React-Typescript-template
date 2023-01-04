import { Entities } from "src/common/constants/enum";
import { makeAStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import {
    getAutocompleteInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import DialogAddStudentInfo, { DialogAddStudentInfoProps } from "../DialogAddStudentInfo";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useClassManyWithNullableCourse from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse";
import useStudentInfoWithFilter from "src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const setupAutocompleteMocks = () => {
    (useAutocompleteReference as jest.Mock).mockImplementation(
        ({ resource }: { resource: string }) => {
            if (resource === Entities.COURSES) {
                return {
                    loading: false,
                    setInputVal: jest.fn(),
                    options: [{ course_id: "Course_Id", name: "Course Name", school_id: 123 }],
                };
            }

            return {
                loading: false,
                setInputVal: jest.fn(),
                options: [{ locationId: "Location_Id", name: "Location Name" }],
            };
        }
    );

    (useClassManyWithNullableCourse as jest.Mock).mockImplementation(() => {
        return {
            classes: [{ class_id: "Class_Id", name: "Class Name" }],
            isLoading: false,
        };
    });
};

const setupStudentInfoWithFilter = () => {
    const studentInfosListMock = [makeAStudentInfo(1), makeAStudentInfo(2)];
    const handleEnterSearchBarMockFunc = jest.fn();
    const handleApplyFilterCriteriaFunc = jest.fn();

    (useStudentInfoWithFilter as jest.Mock).mockImplementation(() => {
        return {
            studentInfosList: studentInfosListMock,
            isLoadingStudentsCourses: false,
            isLoadingGrades: false,
            pagination: createMockPaginationWithTotalObject(),
            handleEnterSearchBar: handleEnterSearchBarMockFunc,
            handleApplyFilterCriteria: handleApplyFilterCriteriaFunc,
        };
    });

    return { studentInfosListMock, handleEnterSearchBarMockFunc, handleApplyFilterCriteriaFunc };
};

const renderDialogAddStudentInfo = (props: DialogAddStudentInfoProps) => {
    render(
        <TestQueryWrapper>
            <TranslationProvider>
                <TestThemeProvider>
                    <DialogAddStudentInfo {...props} />
                </TestThemeProvider>
            </TranslationProvider>
        </TestQueryWrapper>
    );
};

describe("DialogAddStudentInfo", () => {
    const props: DialogAddStudentInfoProps = {
        onClose: jest.fn(),
        onSave: jest.fn(),
        open: true,
        selectedStudentInfoList: [],
    };

    it("should see a empty icon when there are no students", () => {
        setupAutocompleteMocks();

        (useStudentInfoWithFilter as jest.Mock).mockImplementation(() => {
            return {
                studentInfosList: [],
                isLoadingStudentsCourses: false,
                isLoadingGrades: false,
                pagination: createMockPaginationWithTotalObject(),
                handleEnterSearchBar: jest.fn(),
                handleApplyFilterCriteria: jest.fn(),
            };
        });

        renderDialogAddStudentInfo(props);

        expect(screen.getByTestId("LookingFor__icon")).toBeInTheDocument();
    });

    it("should filter students with advanced form filter", async () => {
        setupAutocompleteMocks();
        const { handleApplyFilterCriteriaFunc } = setupStudentInfoWithFilter();

        renderDialogAddStudentInfo(props);

        const dropdownButton = screen.getByTestId("ButtonDropdownWithPopover__button");
        userEvent.click(dropdownButton);
        expect(screen.getByTestId("ButtonDropdownWithPopover__popover")).toBeInTheDocument();

        const gradeAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteGradesHF__autocomplete"
        );
        const courseAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteCoursesHF__autocomplete"
        );
        const locationAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );
        const classAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteClassesOfManyCoursesHF__autocomplete"
        );

        userEvent.click(gradeAutocompleteInput);
        selectAutocompleteOptionByLabel("Grade 1");

        userEvent.click(courseAutocompleteInput);
        selectAutocompleteOptionByLabel("Course Name");

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Location Name");

        userEvent.click(classAutocompleteInput);
        selectAutocompleteOptionByLabel("Class Name");

        const applyButton = screen.getByTestId("ButtonDropdownWithPopover__buttonApply");
        userEvent.click(applyButton);

        await waitFor(() => {
            expect(handleApplyFilterCriteriaFunc).toBeCalled();
        });
    });

    it("should search students by search input field", async () => {
        setupAutocompleteMocks();
        const { handleEnterSearchBarMockFunc } = setupStudentInfoWithFilter();

        renderDialogAddStudentInfo(props);

        const inputField = within(screen.getByTestId("FormFilterAdvanced__textField")).getByRole(
            "textbox"
        );
        const searchText = "Sample Search Text";

        userEvent.type(inputField, searchText);
        userEvent.keyboard("{Enter}");

        await waitFor(() => {
            expect(handleEnterSearchBarMockFunc).toBeCalled();
        });
    });

    it("should close dialog", () => {
        setupAutocompleteMocks();
        setupStudentInfoWithFilter();

        renderDialogAddStudentInfo(props);

        const closeButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(closeButton);

        expect(props.onClose).toBeCalled();
    });

    it("should add selected students", () => {
        setupAutocompleteMocks();
        const { studentInfosListMock } = setupStudentInfoWithFilter();

        renderDialogAddStudentInfo(props);

        studentInfosListMock.forEach((studentInfo) => {
            const checkboxCell = screen.getByRole("cell", {
                name: studentInfo.student.studentName,
            });
            const checkbox = within(checkboxCell).getByRole("checkbox");

            userEvent.click(checkbox);
        });

        const addButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addButton);

        expect(props.onSave).toBeCalledWith(studentInfosListMock);
    });
});
