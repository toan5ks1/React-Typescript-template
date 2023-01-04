import { ModeOpenDialog } from "src/common/constants/enum";
import { generateMockDateForTests } from "src/common/utils/time";
import { getMockEntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/test-utils/mocks/entry-exit";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
} from "src/squads/adobo/domains/entry-exit/test-utils/providers";

import DialogUpsertEntryExitRecord, {
    DialogUpsertEntryExitRecordProps,
} from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/components/DialogUpsertEntryExitRecord";
import MuiPickersUtilsProvider from "src/squads/adobo/domains/entry-exit/providers/MuiPickersUtilsProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAddEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useAddEntryExitRecord";
import useEditEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useEditEntryExitRecord";

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useAddEntryExitRecord",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock(
    "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useEditEntryExitRecord",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

const renderComponent = (props: DialogUpsertEntryExitRecordProps) => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues: props.defaultValues,
                    }}
                >
                    <DialogUpsertEntryExitRecord {...props} />
                </TestHookFormProvider>
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe("<DialogUpsertEntryExitRecord /> ADD mode", () => {
    const mockAddRecord = jest.fn();
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();

    const mockDate = "2022-03-03T07:00:00.000Z";

    generateMockDateForTests(mockDate, Date);

    const defaultValues = getMockEntryExitRecordFormData(mockDate);

    beforeEach(() => {
        (useAddEntryExitRecord as jest.Mock).mockImplementation(() => ({
            addEntryExitRecord: mockAddRecord,
        }));

        const props: DialogUpsertEntryExitRecordProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            onSave: mockOnSave,
            onClose: mockOnClose,
            defaultValues: {
                ...defaultValues,
                entryDate: new Date(mockDate),
                entryTime: new Date(mockDate),
            },
        };

        renderComponent(props);
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.getByTestId("EntryExitRecordForm__root")).toBeInTheDocument();
        expect(screen.getByTestId("EntryExitRecordForm__entryDatePicker")).toBeInTheDocument();
        expect(screen.getByTestId("EntryExitRecordForm__entryTimePicker")).toBeInTheDocument();
        expect(screen.getByTestId("EntryExitRecordForm__exitTimePicker")).toBeInTheDocument();
        expect(screen.getByTestId("CheckboxLabelHF__notifyParents")).toBeInTheDocument();
    });

    it("should call the onClose function", () => {
        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        expect(mockOnClose).toBeCalledTimes(1);
    });

    it("should call the onSave function", async () => {
        const button = screen.getByTestId("FooterDialogConfirm__buttonSave");

        userEvent.click(button);

        await waitFor(() => expect(mockOnSave).toBeCalledTimes(1));
    });
});

describe("<DialogUpsertEntryExitRecord /> EDIT mode", () => {
    const mockEditRecord = jest.fn();
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();

    const mockDate = "2022-03-03T07:00:00.000Z";

    generateMockDateForTests(mockDate, Date);

    const defaultValues = getMockEntryExitRecordFormData(mockDate);

    beforeEach(() => {
        (useEditEntryExitRecord as jest.Mock).mockImplementation(() => ({
            editEntryExitRecord: mockEditRecord,
        }));

        const props: DialogUpsertEntryExitRecordProps = {
            mode: ModeOpenDialog.EDIT,
            open: true,
            onSave: mockOnSave,
            onClose: mockOnClose,
            defaultValues: {
                ...defaultValues,
                entryDate: new Date(mockDate),
                entryTime: new Date(mockDate),
            },
        };

        renderComponent(props);
    });

    it("should match snapshot", () => {
        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.getByTestId("EntryExitRecordForm__root")).toBeInTheDocument();
        expect(screen.getByTestId("EntryExitRecordForm__entryDatePicker")).toBeInTheDocument();
        expect(screen.getByTestId("EntryExitRecordForm__entryTimePicker")).toBeInTheDocument();
        expect(screen.getByTestId("EntryExitRecordForm__exitTimePicker")).toBeInTheDocument();
        expect(screen.getByTestId("CheckboxLabelHF__notifyParents")).toBeInTheDocument();
    });

    it("should call the onClose function", () => {
        const button = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(button);

        expect(mockOnClose).toBeCalledTimes(1);
    });

    it("should call the onSave function", async () => {
        const button = screen.getByTestId("FooterDialogConfirm__buttonSave");

        userEvent.click(button);

        await waitFor(() => expect(mockOnSave).toBeCalledTimes(1));
    });
});
