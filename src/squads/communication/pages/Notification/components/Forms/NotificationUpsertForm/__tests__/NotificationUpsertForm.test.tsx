import { DateTime } from "luxon";
import { UseFormProps } from "react-hook-form";
import { dateIsSame } from "src/common/utils/time";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { getDateAfterDuration } from "src/squads/communication/common/utils/utils";
import { createMockNotificationFormData } from "src/squads/communication/test-utils/notification";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import NotificationUpsertForm, { NotificationUpsertFormProps } from "../NotificationUpsertForm";

import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import TestApp from "src/squads/communication/test-utils/TestApp";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

// TODO: remove when we clone or share AutocompleteReferenceHF component
jest.mock("src/hooks/useAutocompleteReference");

//someone fixes this, missing mock for something in the component
jest.mock("src/hooks/data/useQueryV2", () => ({
    __esModule: true,
    default: () => ({
        data: null,
    }),
}));

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultValuesHookForm = createMockNotificationFormData();

const defaultNotificationUpsertFormProps: NotificationUpsertFormProps = {
    isSubmittingForm: false,
    shouldValidateFullForm: { current: true },
    setEnableScheduleMode: jest.fn(),
    shouldEnableScheduleMode: false,
};

const defaultNotificationUpsertFormOption: UseFormProps = {
    defaultValues: defaultValuesHookForm,
};

interface FeatureToggleMockType {
    isShowSchedule: boolean;
    isShowQuestionnaire: boolean;
    isShowTagFeatures: boolean;
}

const defaultFeatureToggleMock: FeatureToggleMockType = {
    isShowSchedule: true,
    isShowQuestionnaire: true,
    isShowTagFeatures: true,
};

const mockUseFeatureToggle = ({
    isShowSchedule,
    isShowQuestionnaire,
    isShowTagFeatures,
}: FeatureToggleMockType = defaultFeatureToggleMock) => {
    (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
        switch (toggleName) {
            case Features.NOTIFICATION_SCHEDULE_MANAGEMENT:
                return {
                    isEnabled: isShowSchedule,
                };
            case Features.NOTIFICATION_QUESTIONNAIRE:
                return {
                    isEnabled: isShowQuestionnaire,
                };

            case Features.NOTIFICATION_TAGS:
                return {
                    isEnabled: isShowTagFeatures,
                };
        }
    });
};

const renderNotificationUpsertForm = (
    notificationUpsertFormProps: NotificationUpsertFormProps = defaultNotificationUpsertFormProps,
    notificationUpsertFormOption: UseFormProps = defaultNotificationUpsertFormOption
) => {
    return render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider useFormOptions={notificationUpsertFormOption}>
                        <NotificationUpsertForm {...notificationUpsertFormProps} />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
};

describe("<NotificationUpsertForm />", () => {
    it("should render correct UI", () => {
        mockUseFeatureToggle();
        const wrapper: RenderResult = renderNotificationUpsertForm();

        expect(wrapper.queryByTestId("NotificationUpsertForm__root")).toBeInTheDocument();
        expect(wrapper.queryByTestId("CoursesAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.queryByTestId("NotificationUpsertForm__grades")).toBeInTheDocument();
        expect(wrapper.queryByTestId("StudentsAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.queryByTestId("NotificationUpsertForm__targetGroup")).toBeInTheDocument();
        expect(wrapper.queryByTestId("Radio__USER_GROUP_PARENT")).toBeInTheDocument();
        expect(wrapper.queryByTestId("Radio__USER_GROUP_STUDENT")).toBeInTheDocument();
        expect(
            wrapper.queryByTestId("NotificationUpsertForm__radioGroupDeliveryDateType")
        ).toBeInTheDocument();
        expect(wrapper.queryByTestId("Radio__NOTIFICATION_STATUS_DRAFT")).toBeInTheDocument();
        expect(wrapper.queryByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED")).toBeInTheDocument();
        expect(wrapper.queryByTestId("NotificationUpsertForm__inputTitle")).toBeInTheDocument();
        expect(wrapper.queryByTestId("Editor__content")).toBeInTheDocument();
        expect(wrapper.queryByTestId("DynamicQuestionSection__root")).toBeInTheDocument();
        expect(
            wrapper.getByTestId("NotificationUpsertForm__switchImportantNotification")
        ).toBeInTheDocument();

        expect(wrapper.getByTestId("FormTagSection__tagAutocomplete")).toBeInTheDocument();
    });

    it("should render autocomplete chip that have the style ellipsis", async () => {
        mockUseFeatureToggle();
        renderNotificationUpsertForm();

        await waitFor(() => {
            const chipAutoCompletes = screen.queryAllByTestId("ChipAutocomplete");

            for (const chip of chipAutoCompletes) {
                expect(chip).toBeInTheDocument();
                expect(chip.querySelector("span")).toHaveStyle("text-overflow: ellipsis;");
            }
        });
    });

    it("should render autocomplete chip tag box that have the padding of 2px", async () => {
        mockUseFeatureToggle();
        renderNotificationUpsertForm();

        await waitFor(() => {
            const autoCompletesTagBoxes = screen.queryAllByTestId("AutocompleteBase__tagBox");

            for (const tagBox of autoCompletesTagBoxes) {
                expect(tagBox).toBeInTheDocument();
                expect(tagBox).toHaveStyle("padding: 2px;");
            }
        });
    });

    it("should render chip file description with href link", () => {
        mockUseFeatureToggle();
        renderNotificationUpsertForm();

        const attachmentLinks = screen.queryAllByTestId("ExternalLink");
        for (const attachment of attachmentLinks) {
            expect(attachment).toHaveAttribute("href");
        }
    });

    it("should show delivery schedule inputs", async () => {
        mockUseFeatureToggle();
        const wrapper: RenderResult = renderNotificationUpsertForm({
            ...defaultNotificationUpsertFormProps,
            shouldEnableScheduleMode: true,
        });

        await waitFor(() => {
            expect(
                wrapper.getByTestId("NotificationUpsertForm__scheduledDate")
            ).toBeInTheDocument();
        });
        expect(wrapper.getByTestId("TimePickerAutocompleteHF__autocomplete")).toBeInTheDocument();
    });

    it("should disable the date in the past", async () => {
        mockUseFeatureToggle();
        renderNotificationUpsertForm({
            ...defaultNotificationUpsertFormProps,
            shouldEnableScheduleMode: true,
        });

        userEvent.click(screen.getByTestId("NotificationUpsertForm__scheduledDate"));

        expect(
            screen.getByRole("presentation", { name: "DatePickerHF__dialog" })
        ).toBeInTheDocument();

        const currentDate = getDateAfterDuration(0);
        const previousDate = getDateAfterDuration(-1);

        const convertedCurrentDate = DateTime.fromJSDate(currentDate).toLocaleString(
            DateTime.DATE_MED
        );
        const convertedPreviousDate = DateTime.fromJSDate(previousDate).toLocaleString(
            DateTime.DATE_MED
        );

        const currentDateButton = screen.getByRole("button", { name: convertedCurrentDate });
        expect(currentDateButton).not.toBeDisabled();
        expect(currentDateButton).toHaveAttribute("tabIndex", "0");

        if (dateIsSame(currentDate, previousDate, "month")) {
            const previousDateButton = screen.getByRole("button", { name: convertedPreviousDate });
            expect(previousDateButton).toBeDisabled();
            expect(previousDateButton).toHaveAttribute("tabIndex", "-1");
        }
    });

    // TODO: Remove after schedule notification passed on staging
    it("should not show delivery date schedule row with hidden delivery schedule permission config", () => {
        mockUseFeatureToggle({
            isShowSchedule: false,
            isShowQuestionnaire: true,
            isShowTagFeatures: true,
        });
        const wrapper: RenderResult = renderNotificationUpsertForm();

        expect(
            wrapper.queryByTestId("NotificationUpsertForm__radioGroupDeliveryDateType")
        ).not.toBeInTheDocument();

        expect(
            wrapper.queryByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED")
        ).not.toBeInTheDocument();

        expect(wrapper.queryByTestId("Radio__NOTIFICATION_STATUS_DRAFT")).not.toBeInTheDocument();
    });

    it("should not show dynamic question section when feature toggle return false", () => {
        mockUseFeatureToggle({
            isShowSchedule: true,
            isShowQuestionnaire: false,
            isShowTagFeatures: true,
        });
        renderNotificationUpsertForm();

        expect(screen.queryByTestId("DynamicQuestionSection__root")).not.toBeInTheDocument();
    });

    it("should not tag section when feature toggle return false", () => {
        mockUseFeatureToggle({
            isShowSchedule: true,
            isShowQuestionnaire: true,
            isShowTagFeatures: false,
        });
        renderNotificationUpsertForm();

        expect(screen.queryByTestId("FormTagSection__tagAutocomplete")).not.toBeInTheDocument();
    });
});

describe("<NotificationUpsertForm /> test with notification", () => {
    it("should render course, content editor of existed notification", () => {
        mockUseFeatureToggle();
        renderNotificationUpsertForm(defaultNotificationUpsertFormProps, {
            defaultValues: {
                ...defaultValuesHookForm,
                isAllCourses: true,
                courses: [
                    {
                        course_id: "",
                        value: "All Courses",
                        name: "All Courses",
                        school_id: 1,
                    } as NotificationFormData["courses"][0],
                ],
            },
        });

        expect(screen.getByText("All Courses")).toBeInTheDocument();
    });
});
