import { FormFilterNotificationListValues } from "src/squads/communication/common/constants/types";
import { getCurrentDateWithSpecificHour } from "src/squads/communication/common/utils/utils";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockNotificationsTagList } from "src/squads/communication/test-utils/notification";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";
import {
    changeAutocompleteValue,
    changeDatePicker,
} from "src/squads/communication/test-utils/utils";

import FormFilterAdvancedNotificationList, {
    FormFilterNotificationListProps,
    formFilterDefaultValues,
} from "src/squads/communication/pages/Notification/components/Forms/FormFilterAdvancedNotificationList/FormFilterAdvancedNotificationList";
import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import { render, within, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const mockDefaultSearchKeyword = "default keyword";
const mockDataFormFilter: FormFilterNotificationListValues = {
    fromDate: new Date(),
    toDate: new Date(),
    fromTime: {
        label: "10:00",
        value: getCurrentDateWithSpecificHour("10:00"),
    },
    toTime: {
        label: "11:00",
        value: getCurrentDateWithSpecificHour("11:00"),
    },
    tags: createMockNotificationsTagList(),
};

const mockFormFilterNotificationListProps: FormFilterNotificationListProps = {
    onApplySubmit: jest.fn(),
    onEnterSearchBar: jest.fn(),
};

const openFormFilter = () => {
    const buttonDropdown = screen.getByTestId("ButtonDropdownWithPopover__button");
    userEvent.click(buttonDropdown);
};

const submitFormFilter = () => {
    const applyButton = screen.getByTestId("ButtonDropdownWithPopover__buttonApply");
    userEvent.click(applyButton);
};

const renderFormFilterAdvancedNotificationList = (
    formData: FormFilterNotificationListValues,
    props: FormFilterNotificationListProps = mockFormFilterNotificationListProps
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <MuiPickersUtilsProvider>
                    <TestHookFormProvider
                        useFormOptions={{
                            defaultValues: formData,
                        }}
                    >
                        <FormFilterAdvancedNotificationList {...props} />
                    </TestHookFormProvider>
                </MuiPickersUtilsProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<FormFilterAdvancedNotificationList />", () => {
    it("should render default UI", () => {
        renderFormFilterAdvancedNotificationList(formFilterDefaultValues);

        expect(screen.getByTestId("FormFilterAdvanced__textField")).toBeInTheDocument();
        expect(screen.getByTestId("ButtonDropdownWithPopover__button")).toBeInTheDocument();
    });
    it("should render correctly all fields of form filter when clicked dropdown button", () => {
        renderFormFilterAdvancedNotificationList(formFilterDefaultValues);

        openFormFilter();

        const buttonFromTime = screen.getByTestId(
            "FormFilterAdvancedNotificationList__timePickerFromTime"
        );
        const buttonToTime = screen.getByTestId(
            "FormFilterAdvancedNotificationList__timePickerToTime"
        );

        expect(screen.getByTestId("FormFilterAdvancedNotificationList__root")).toBeInTheDocument();

        expect(
            screen.getByTestId("FormFilterAdvancedNotificationList__datePickerFromDate")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("FormFilterAdvancedNotificationList__datePickerToDate")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("FormFilterAdvancedNotificationList__timePickerFromTime")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("FormFilterAdvancedNotificationList__timePickerToTime")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("FormFilterAdvancedNotificationList__autocompleteTags")
        ).toBeInTheDocument();

        expect(within(buttonFromTime).getByRole("button")).toBeDisabled();
        expect(within(buttonToTime).getByRole("button")).toBeDisabled();
    });

    it("should enable From Time/To Time when inputted value for From Date/To Date", () => {
        const screen = renderFormFilterAdvancedNotificationList({
            fromDate: new Date(),
            toDate: new Date(),
            fromTime: null,
            toTime: null,
            tags: [],
        });

        openFormFilter();

        const buttonFromTime = screen.getByTestId(
            "FormFilterAdvancedNotificationList__timePickerFromTime"
        );
        const buttonToTime = screen.getByTestId(
            "FormFilterAdvancedNotificationList__timePickerToTime"
        );

        expect(within(buttonFromTime).getByRole("button")).toBeEnabled();
        expect(within(buttonToTime).getByRole("button")).toBeEnabled();
    });
});

describe("<FormFilterAdvancedNotificationList /> handle search input", () => {
    it("should handle search correctly", () => {
        renderFormFilterAdvancedNotificationList(formFilterDefaultValues);

        const searchBar = screen.getByRole("textbox");

        userEvent.type(searchBar, mockDefaultSearchKeyword);
        userEvent.keyboard("{Enter}");

        expect(mockFormFilterNotificationListProps.onEnterSearchBar).toBeCalledWith(
            mockDefaultSearchKeyword
        );
    });
});

describe("<FormFilterAdvancedNotificationList /> handle apply button", () => {
    it("should not call onApplySubmit when do not mutate any field in filter form", async () => {
        renderFormFilterAdvancedNotificationList(formFilterDefaultValues);

        openFormFilter();
        submitFormFilter();

        expect(mockFormFilterNotificationListProps.onApplySubmit).not.toBeCalled();
    });

    it("should call onApplySubmit when the filter form has full field values", async () => {
        renderFormFilterAdvancedNotificationList(mockDataFormFilter);
        openFormFilter();

        changeDatePicker("FormFilterAdvancedNotificationList__datePickerFromDate", new Date());
        changeDatePicker("FormFilterAdvancedNotificationList__datePickerToDate", new Date());
        changeAutocompleteValue("FormFilterAdvancedNotificationList__timePickerFromTime", "10:00");
        changeAutocompleteValue("FormFilterAdvancedNotificationList__timePickerToTime", "11:00");
        changeAutocompleteValue("FormFilterAdvancedNotificationList__autocompleteTags", "tagName1");

        submitFormFilter();

        await waitFor(() => expect(mockFormFilterNotificationListProps.onApplySubmit).toBeCalled());
        expect(screen.queryAllByTestId("FormFilterAdvancedChipList__chipItem")).toHaveLength(5);
        expect(
            screen.getByTestId("FormFilterAdvancedChipList__buttonClearAll")
        ).toBeInTheDocument();
    });
});

describe("<FormFilterAdvancedNotificationList /> handle reset button", () => {
    it("should disable reset button when the FormFilterAdvanced without values", () => {
        renderFormFilterAdvancedNotificationList(formFilterDefaultValues);
        openFormFilter();

        const resetButtonElement = screen.getByTestId("ButtonDropdownWithPopover__buttonReset");
        expect(resetButtonElement).toHaveAttribute("disabled");
    });

    it("should reset FormFilterAdvanced correctly", () => {
        renderFormFilterAdvancedNotificationList(mockDataFormFilter);
        openFormFilter();

        const resetButtonElement = screen.getByTestId("ButtonDropdownWithPopover__buttonReset");
        userEvent.click(resetButtonElement);

        expect(screen.queryAllByTestId("ChipAutocomplete")).toHaveLength(0);
        expect(
            screen.queryByTestId("FormFilterAdvancedChipList__buttonClearAll")
        ).not.toBeInTheDocument();
    });
});
