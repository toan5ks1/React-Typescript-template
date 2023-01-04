import { KeyUserNotificationStatus, UserRoles } from "src/common/constants/const";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockNotificationPagination,
    createMockNotificationParentNames,
    createMockNotificationReceipt,
    createMockNotificationReceiptWithQuestionnaireStatus,
    createMockNotificationStudentNames,
} from "src/squads/communication/test-utils/notification";

import TranslationProvider from "src/providers/TranslationProvider";
import RecipientTable, {
    RecipientTableProps,
} from "src/squads/communication/pages/Notification/components/Tables/RecipientTable/RecipientTable";

import { render, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useNotificationReceipt, {
    UseNotificationReceiptReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationReceipt";

// TODO:  Remove mockUseFeatureToggle after NOTIFICATION_QUESTIONNAIRE release
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationReceipt", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useResourceTranslate", () => ({
    __esModule: true,
    default: () => (key: string) => key,
}));

interface MockUseNotificationReceiptProps
    extends Omit<UseNotificationReceiptReturn, "loading" | "pagination"> {
    isShowQuestionnaireFeature?: boolean;
}

const mockUseNotificationReceipt = ({
    isShowQuestionnaireFeature = false,
    notificationReceipt,
    parentNames,
    studentNames,
}: MockUseNotificationReceiptProps) => {
    (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
        if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
            return {
                isEnabled: isShowQuestionnaireFeature,
            };
        }
    });
    (useNotificationReceipt as jest.Mock).mockImplementation(() => {
        return {
            notificationReceipt,
            parentNames,
            studentNames,
            pagination,
            loading: false,
        };
    });
};

const defaultRecipientTableProps: RecipientTableProps = {
    isHaveQuestionnaireData: true,
    notificationId: "notification_id1",
};

const renderRecipientTableTest = (props: RecipientTableProps = defaultRecipientTableProps) => {
    // TODO: remove TranslationProvider when we clone or share TableBaseFooter component
    return render(
        <TranslationProvider>
            <TestApp>
                <RecipientTable {...props} />
            </TestApp>
        </TranslationProvider>
    );
};

const notificationReceipt = createMockNotificationReceipt();
const notificationReceiptWithQuestionnaireStatus =
    createMockNotificationReceiptWithQuestionnaireStatus();
const parentNames = createMockNotificationParentNames();
const studentNames = createMockNotificationStudentNames();
const pagination = createMockNotificationPagination();

describe("<RecipientTable /> with questionnaire feature off", () => {
    it("should render snapshot", () => {
        mockUseNotificationReceipt({ notificationReceipt, parentNames, studentNames });
        const { container } = renderRecipientTableTest();
        expect(container).toMatchSnapshot();
    });

    it("should render correct UI with pagination", () => {
        mockUseNotificationReceipt({ notificationReceipt, parentNames, studentNames });

        renderRecipientTableTest();

        expect(screen.getByTestId("Recipient__status")).toBeInTheDocument();
        expect(screen.getByTestId("Recipient__table")).toBeInTheDocument();
        expect(screen.getByTestId("RecipientTable__linkName")).toBeInTheDocument();
        expect(screen.getByTestId("TableBaseFooter")).toBeInTheDocument();
    });
});

describe("<RecipientTable /> without data", () => {
    it("should call function getUserNameById and render without studentNames", () => {
        mockUseNotificationReceipt({ notificationReceipt, parentNames: [], studentNames: [] });

        renderRecipientTableTest();
        expect(screen.getByTestId("RecipientTable__linkName")[0]).toBeUndefined();

        const mock = jest.fn().mockImplementation(() => "");
        expect(mock("getUserNameById")).toEqual("");
        expect(mock).toHaveBeenCalledWith("getUserNameById");
    });

    it("should render individual user & UserRoles is Parent", () => {
        mockUseNotificationReceipt({
            notificationReceipt: [
                {
                    course_ids: ["course_id1", "course_id2"],
                    current_grade: 13,
                    notification_id: "notification_id1",
                    status: KeyUserNotificationStatus.USER_NOTIFICATION_STATUS_NEW,
                    user_id: "student1",
                    user_notification_id: "user_notification_id1",
                    user_group: UserRoles.USER_GROUP_STUDENT,
                },
                {
                    course_ids: ["course_id1", "course_id2"],
                    current_grade: 13,
                    notification_id: "notification_id1",
                    status: KeyUserNotificationStatus.USER_NOTIFICATION_STATUS_NEW,
                    user_id: "parent1",
                    student_id: "student_1",
                    parent_id: "parent_id_1",
                    user_notification_id: "user_notification_id2",
                    user_group: UserRoles.USER_GROUP_PARENT,
                },
            ],
            parentNames: [],
            studentNames,
        });

        renderRecipientTableTest();

        expect(screen.queryAllByText("Student 1")).toHaveLength(1);
        expect(screen.queryAllByText("label.parentOfStudent")).toHaveLength(1);
    });
});

describe("<RecipientTable /> with NOTIFICATION_QUESTIONNAIRE feature on", () => {
    it("should render snapshot", () => {
        mockUseNotificationReceipt({
            notificationReceipt: notificationReceiptWithQuestionnaireStatus,
            parentNames,
            studentNames,
        });
        const { container } = renderRecipientTableTest();
        expect(container).toMatchSnapshot();
    });
    it("should render UI with pagination", () => {
        mockUseNotificationReceipt({
            isShowQuestionnaireFeature: true,
            notificationReceipt: notificationReceiptWithQuestionnaireStatus,
            parentNames,
            studentNames,
        });

        renderRecipientTableTest();

        expect(screen.getByTestId("Recipient__status")).toBeInTheDocument();
        expect(screen.getByTestId("Recipient__table")).toBeInTheDocument();
        expect(screen.getByTestId("ChipQuestionnaireStatus")).toBeInTheDocument();
        expect(screen.getByTestId("RecipientTable__linkName")).toBeInTheDocument();
        expect(screen.getByTestId("TableBaseFooter")).toBeInTheDocument();
    });
    it("should render correct data in the table", () => {
        mockUseNotificationReceipt({
            isShowQuestionnaireFeature: true,
            notificationReceipt: notificationReceiptWithQuestionnaireStatus,
            parentNames,
            studentNames,
        });

        renderRecipientTableTest();

        expect(
            screen.queryAllByText(
                "questionnaireStatus.USER_NOTIFICATION_QUESTIONNAIRE_STATUS_ANSWERED"
            )
        ).toHaveLength(1);
    });
});

describe("<RecipientTable /> with NOTIFICATION_QUESTIONNAIRE feature on", () => {
    it("should render snapshot", () => {
        mockUseNotificationReceipt({
            isShowQuestionnaireFeature: true,
            notificationReceipt: notificationReceiptWithQuestionnaireStatus,
            parentNames,
            studentNames,
        });

        const { container } = renderRecipientTableTest({
            ...defaultRecipientTableProps,
            isHaveQuestionnaireData: false,
        });

        expect(container).toMatchSnapshot();
    });
    it("should render Recipient table without questionnaire column when notification don't have questionnaire", () => {
        mockUseNotificationReceipt({
            isShowQuestionnaireFeature: true,
            notificationReceipt: notificationReceiptWithQuestionnaireStatus,
            parentNames,
            studentNames,
        });

        renderRecipientTableTest({
            ...defaultRecipientTableProps,
            isHaveQuestionnaireData: false,
        });

        expect(screen.getByTestId("Recipient__status")).toBeInTheDocument();
        expect(screen.getByTestId("Recipient__table")).toBeInTheDocument();
        expect(screen.queryByTestId("ChipQuestionnaireStatus")).not.toBeInTheDocument();
        expect(screen.getByTestId("RecipientTable__linkName")).toBeInTheDocument();
        expect(screen.getByTestId("TableBaseFooter")).toBeInTheDocument();
    });
});
