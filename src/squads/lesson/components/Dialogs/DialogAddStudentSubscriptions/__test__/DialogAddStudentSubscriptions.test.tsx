import { TestApp } from "src/squads/lesson/test-utils";
import {
    mockCourseOptionsAutoCompleteReference,
    mockStudentInfoList,
    mockUseLessonStudentInfoListFilter,
} from "src/squads/lesson/test-utils/lesson-management";

import DialogAddStudentSubscriptions, {
    DialogAddStudentSubscriptionsProps,
} from "../DialogAddStudentSubscriptions";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => jest.fn());
jest.mock("src/squads/lesson/hooks/useLessonStudentInfoListFilter", () => jest.fn());

const mockAddedStudents: DialogAddStudentSubscriptionsProps["selectedStudentInfoList"] = [
    mockStudentInfoList[0],
];

const mockUseAutocompleteReference = () => {
    (useAutocompleteReference as jest.Mock).mockReset().mockImplementation(() => {
        return {
            loading: false,
            setInputVal: jest.fn(),
            options: mockCourseOptionsAutoCompleteReference,
            defaultValue: [],
        };
    });
};

const renderDialogAddStudentSubscriptionsWrapper = (props: DialogAddStudentSubscriptionsProps) => {
    return render(
        <TestApp>
            <DialogAddStudentSubscriptions {...props} />
        </TestApp>
    );
};

describe("<DialogAddStudentSubscriptions />", () => {
    beforeEach(() => {
        mockUseAutocompleteReference();
        mockUseLessonStudentInfoListFilter();
    });

    const props: DialogAddStudentSubscriptionsProps = {
        onClose: jest.fn(),
        onSave: jest.fn(),
        open: true,
        selectedStudentInfoList: mockAddedStudents,
    };

    it("should render medium dialog size", () => {
        const wrapper = renderDialogAddStudentSubscriptionsWrapper(props);

        expect(wrapper.getByTestId("DialogWithHeaderFooter_wrapper")).toHaveStyle(
            "min-width: 960px"
        );
    });

    it("should have filter bar and table student info", () => {
        const wrapper = renderDialogAddStudentSubscriptionsWrapper(props);

        expect(wrapper.getByTestId("TableStudentSubscriptions__tableContainer")).toBeVisible();
        expect(wrapper.getByTestId("FormFilterAdvanced__root")).toBeVisible();
    });

    it("should call onClose function", () => {
        const wrapper = renderDialogAddStudentSubscriptionsWrapper(props);

        const closeButton = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(closeButton);

        expect(props.onClose).toBeCalled();
    });

    it("should call onSave function", () => {
        const wrapper = renderDialogAddStudentSubscriptionsWrapper(props);

        const checkBoxHeader = wrapper.getByTestId("TableHeaderWithCheckbox__checkboxHeader");
        userEvent.click(checkBoxHeader);

        const addButton = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addButton);

        expect(props.onSave).toBeCalledWith(mockStudentInfoList);
    });
});
