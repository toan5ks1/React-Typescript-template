import { combineDateAndTime, formatDate, generateMockDateForTests } from "src/common/utils/time";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";
import { EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service/entryexitmgmt-types";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import {
    inferMutationBob,
    inferQueryPaginationBob,
    inferQueryPagination,
} from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import studentEntryExitService from "src/squads/adobo/domains/entry-exit/services/student-entry-exit-service";
import { selectTimeForTimePickerAMPM } from "src/squads/adobo/domains/entry-exit/test-utils/date-time-picker-helper";
import { getLatestCallParams } from "src/squads/adobo/domains/entry-exit/test-utils/mock-utils";
import {
    getMockEntryExitRecordFormData,
    getMockEntryExitRecordsData,
    getMockEntryExitRecordsPagination,
    getMockEntryExitRecordsFilterData,
    getMockEntryExitRecordsDataThisMonth,
    getMockEntryExitRecordsDataLastMonth,
    getMockEntryExitRecordsDataThisYear,
} from "src/squads/adobo/domains/entry-exit/test-utils/mocks/entry-exit";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestThemeProvider,
} from "src/squads/adobo/domains/entry-exit/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/adobo/domains/entry-exit/providers/MuiPickersUtilsProvider";

import { StudentEntryExitRecord } from "..";
import StudentEntryExit from "../StudentEntryExit";
import useEditEntryExitRecord from "../hooks/useEditEntryExitRecord";

import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/adobo/domains/entry-exit/hooks/useFeatureToggle";
import useAddEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useAddEntryExitRecord";
import useDeleteEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useDeleteEntryExitRecord";

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

jest.mock(
    "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useDeleteEntryExitRecord",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/adobo/domains/entry-exit/services/infer-service", () => {
    return {
        __esModule: true,
        inferMutationBob: jest.fn(),
        inferQueryPaginationBob: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderComponent = (status: string) => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <TestThemeProvider>
                    <MuiPickersUtilsProvider>
                        <StudentEntryExit studentId="studentid1" enrollmentStatus={status} />
                    </MuiPickersUtilsProvider>
                </TestThemeProvider>
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

// status to use for both Enrolled and Potential students
const statusEnrolled = "STUDENT_ENROLLMENT_STATUS_ENROLLED";

// status to use for Withdrawn, LOA, Graduated students
const statusGraduated = "STUDENT_ENROLLMENT_STATUS_GRADUATED";

describe("<StudentEntryExit /> records history table", () => {
    const mockAddRecord = jest.fn();
    const mockEditRecord = jest.fn();
    const mockDeleteRecord = jest.fn();
    const mockRefetch = jest.fn();

    const mockDate = "2022-03-02T07:00:00.000Z";

    generateMockDateForTests(mockDate, Date);

    beforeEach(() => {
        (inferQueryPaginationBob as jest.Mock).mockImplementation(() => () => {
            return {
                data: getMockEntryExitRecordsData(),
                result: {
                    isLoading: false,
                    refetch: mockRefetch,
                },
                pagination: getMockEntryExitRecordsPagination(),
            };
        });

        (useAddEntryExitRecord as jest.Mock).mockImplementation(() => ({
            addEntryExitRecord: mockAddRecord,
        }));

        (useEditEntryExitRecord as jest.Mock).mockImplementation(() => ({
            editEntryExitRecord: mockEditRecord,
        }));

        (useDeleteEntryExitRecord as jest.Mock).mockImplementation(() => ({
            deleteEntryExitRecord: mockDeleteRecord,
        }));
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });
    });

    it("should render History title and Table that displays records history", () => {
        renderComponent(statusEnrolled);

        expect(screen.getByTestId("StudentEntryExit__title")).toBeInTheDocument();
        expect(screen.getByTestId("StudentEntryExit__table")).toBeInTheDocument();
    });

    it("should have the same number of rows as the number of records plus one for the header", () => {
        renderComponent(statusEnrolled);

        expect(screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnDate")).toHaveLength(
            3
        );
    });

    it("should display the table column names correctly", () => {
        renderComponent(statusEnrolled);

        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnDate")[0]
        ).toHaveTextContent("Date");
        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnEntryTime")[0]
        ).toHaveTextContent("Entry Time");
        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnExitTime")[0]
        ).toHaveTextContent("Exit Time");
        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnAction")[0]
        ).toHaveTextContent("Action");
    });

    it("should have the same table content as the mock data", () => {
        renderComponent(statusEnrolled);
        const expectedData = getMockEntryExitRecordsData();

        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnDate")[1]
        ).toHaveTextContent(formatDate(expectedData[0].entry_at, "yyyy/LL/dd"));
        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnEntryTime")[1]
        ).toHaveTextContent(formatDate(expectedData[0].entry_at, "HH:mm"));
        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnExitTime")[1]
        ).toHaveTextContent(formatDate(expectedData[0].exit_at, "HH:mm"));

        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnDate")[2]
        ).toHaveTextContent(formatDate(expectedData[1].entry_at, "yyyy/LL/dd"));
        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnEntryTime")[2]
        ).toHaveTextContent(formatDate(expectedData[1].entry_at, "HH:mm"));
        expect(
            screen.getAllByTestId("StudentEntryExitRecordsTableCell__columnExitTime")[2]
        ).toHaveTextContent("--");
    });

    it("should open upsert dialog box with Add mode when Add Button is clicked", () => {
        renderComponent(statusEnrolled);

        const btnAdd = screen.getByTestId("StudentEntryExit__btnAdd");

        userEvent.click(btnAdd);

        expect(screen.getByTestId("DialogFullScreen__dialog")).toBeInTheDocument();

        const btnClose = screen.getByTestId("FooterDialogConfirm__buttonClose");

        userEvent.click(btnClose);

        expect(screen.queryByTestId("DialogFullScreen__dialog")).not.toBeInTheDocument();
    });

    it("should add a new record", async () => {
        const mockResponse: NsStudentEntryExitService.CreateEntryExitResponse = {
            message: "Successfully created",
            parentNotified: true,
            successful: true,
        };

        const mockRecordForm: EntryExitRecordFormData = getMockEntryExitRecordFormData(mockDate);

        const payload: NsStudentEntryExitService.EntryExitPayload = {
            entryDateTime: combineDateAndTime(mockRecordForm.entryDate, mockRecordForm.entryTime),
            studentId: mockRecordForm.studentId,
            notifyParents: true,
        };

        const toAddRecord: NsStudentEntryExitService.CreateEntryExitRequest = {
            entryExitPayload: payload,
            ...payload,
        };

        (inferMutationBob as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService.mutation;
                }) =>
                (
                    options: UseMutationOptions<
                        NsStudentEntryExitService.CreateEntryExitRequest,
                        NsStudentEntryExitService.CreateEntryExitResponse
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(mockResponse, toAddRecord, undefined);
                        }),
                    };
                }
        );

        renderComponent(statusEnrolled);

        const btnAdd = screen.getByTestId("StudentEntryExit__btnAdd");

        userEvent.click(btnAdd);

        const btnConfirm = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(btnConfirm);

        await waitFor(() => {
            expect(mockAddRecord).toBeCalledWith(mockRecordForm, {
                onSuccess: expect.any(Function),
            });
            getLatestCallParams(mockAddRecord)[1].onSuccess();
        });

        expect(mockRefetch).toBeCalledTimes(1);
    });

    it("should delete the selected record when clicking Delete in Action Panel", async () => {
        const mockResponse: NsStudentEntryExitService.DeleteEntryExitResponse = {
            successful: true,
        };

        const toDeleteRecord: NsStudentEntryExitService.DeleteEntryExitRequest = {
            entryexitId: getMockEntryExitRecordsData()[1].entryexit_id,
            studentId: getMockEntryExitRecordsData()[1].student_id,
        };

        (inferMutationBob as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService.mutation;
                }) =>
                (
                    options: UseMutationOptions<
                        NsStudentEntryExitService.DeleteEntryExitRequest,
                        NsStudentEntryExitService.DeleteEntryExitResponse
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(mockResponse, toDeleteRecord, undefined);
                        }),
                    };
                }
        );

        const wrapper = renderComponent(statusEnrolled);

        const btnAction = wrapper.getAllByTestId("ActionPanel__trigger")[1];

        userEvent.click(btnAction);

        const btnDelete = within(wrapper.getByTestId("ActionPanel__menuList")).getAllByRole(
            "menuitem",
            {
                hidden: true,
            }
        )[1];

        userEvent.click(btnDelete);

        const btnConfirm = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(btnConfirm);

        await waitFor(() => {
            expect(mockDeleteRecord).toBeCalledWith(toDeleteRecord, {
                onSuccess: expect.any(Function),
            });
            getLatestCallParams(mockDeleteRecord)[1].onSuccess();
        });

        expect(mockRefetch).toBeCalledTimes(1);
    });

    it("should disable Add, Edit, Delete actions if status is not Enrolled or Potential", () => {
        renderComponent(statusGraduated);

        const btnAdd = screen.getByTestId("StudentEntryExit__btnAdd");

        expect(btnAdd).toBeDisabled();

        const btnAction = screen.getAllByTestId("ActionPanel__trigger")[1];

        userEvent.click(btnAction);

        const btnActionItems = within(screen.getByTestId("ActionPanel__menuList")).getAllByRole(
            "menuitem",
            {
                hidden: true,
            }
        );

        for (let item of btnActionItems) {
            expect(item).toHaveAttribute("aria-disabled", "true");
        }
    });

    it("should show empty records, and no pagination when no records are found", async () => {
        (inferQueryPaginationBob as jest.Mock).mockImplementation(() => () => {
            return {
                data: [],
                result: {
                    isLoading: false,
                    refetch: mockRefetch,
                },
                pagination: getMockEntryExitRecordsPagination(),
            };
        });

        renderComponent(statusEnrolled);

        expect(screen.getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
        expect(screen.queryByTestId("TableBaseFooter")).not.toBeInTheDocument();
    });
});

describe("<StudentEntryExit /> editing an existing record of Enrolled students", () => {
    const mockAddRecord = jest.fn();
    const mockEditRecord = jest.fn();
    const mockDeleteRecord = jest.fn();
    const mockRefetch = jest.fn();

    const mockDate = "2022-02-11T01:28:20.769718Z";

    beforeEach(() => {
        (inferQueryPaginationBob as jest.Mock).mockImplementation(() => () => {
            return {
                data: getMockEntryExitRecordsData(),
                result: {
                    isLoading: false,
                    refetch: mockRefetch,
                },
                pagination: getMockEntryExitRecordsPagination(),
            };
        });
        (useAddEntryExitRecord as jest.Mock).mockImplementation(() => ({
            addEntryExitRecord: mockAddRecord,
        }));

        (useEditEntryExitRecord as jest.Mock).mockImplementation(() => ({
            editEntryExitRecord: mockEditRecord,
        }));

        (useDeleteEntryExitRecord as jest.Mock).mockImplementation(() => ({
            deleteEntryExitRecord: mockDeleteRecord,
        }));
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });
    });

    it("should open upsert dialog box with Edit mode when Action Panel and Edit Button is clicked", () => {
        renderComponent(statusEnrolled);

        const btnAction = screen.getAllByTestId("ActionPanel__trigger")[1];

        userEvent.click(btnAction);

        const btnEdit = within(screen.getByTestId("ActionPanel__menuList")).getAllByRole(
            "menuitem",
            {
                hidden: true,
            }
        )[0];

        userEvent.click(btnEdit);

        expect(screen.getByTestId("DialogFullScreen__dialog")).toBeInTheDocument();

        const btnClose = screen.getByTestId("FooterDialogConfirm__buttonClose");

        userEvent.click(btnClose);

        expect(screen.queryByTestId("DialogFullScreen__dialog")).not.toBeInTheDocument();
    });

    it("should edit an existing record", async () => {
        const wrapper = renderComponent(statusEnrolled);

        const mockResponse: NsStudentEntryExitService.UpdateEntryExitResponse = {
            parentNotified: true,
            successful: true,
        };

        const mockRecord: StudentEntryExitRecord = getMockEntryExitRecordsData()[1];
        const mockRecordForm: EntryExitRecordFormData = getMockEntryExitRecordFormData(mockDate);

        mockRecordForm.entryTime = new Date("2022-02-11T09:00:00.0000Z");
        mockRecordForm.exitTime = new Date("2022-02-11T10:00:00.0000Z");
        mockRecordForm.notifyParents = true;

        const payload: NsStudentEntryExitService.EntryExitPayload = {
            entryDateTime: combineDateAndTime(mockRecordForm.entryDate, mockRecordForm.entryTime),
            exitDateTime: combineDateAndTime(mockRecordForm.entryDate, mockRecordForm.exitTime),
            studentId: mockRecordForm.studentId,
            notifyParents: true,
        };

        const toEditRecord: NsStudentEntryExitService.UpdateEntryExitRequest = {
            entryExitPayload: payload,
            entryexitId: mockRecord.entryexit_id,
        };

        (inferMutationBob as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService.mutation;
                }) =>
                (
                    options: UseMutationOptions<
                        NsStudentEntryExitService.UpdateEntryExitRequest,
                        NsStudentEntryExitService.UpdateEntryExitResponse
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(mockResponse, toEditRecord, undefined);
                        }),
                    };
                }
        );

        const btnAction = screen.getAllByTestId("ActionPanel__trigger")[0];
        expect(btnAction).toBeInTheDocument();

        userEvent.click(btnAction);

        const btnEdit = within(screen.getByTestId("ActionPanel__menuList")).getAllByRole(
            "menuitem",
            {
                hidden: false,
            }
        )[0];

        userEvent.click(btnEdit);

        const entryTimePicker = screen
            .getByTestId("EntryExitRecordForm__entryTimePicker")
            .querySelector("input") as HTMLElement;

        expect(entryTimePicker).toBeInTheDocument();

        await selectTimeForTimePickerAMPM(wrapper, entryTimePicker, 9, 0, "AM");

        const exitTimePicker = screen
            .getByTestId("EntryExitRecordForm__exitTimePicker")
            .querySelector("input") as HTMLElement;

        expect(exitTimePicker).toBeInTheDocument();

        await selectTimeForTimePickerAMPM(wrapper, exitTimePicker, 10, 0, "AM");

        const notifyParentsCheckbox = screen.getByTestId("CheckboxLabelHF__notifyParents");
        userEvent.click(notifyParentsCheckbox);

        const btnConfirm = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(btnConfirm);

        await waitFor(() => {
            // since the time picker util won't be accurate in the milliseconds part of the datetime,
            // we'll just check that onSuccess was called
            expect(mockEditRecord).toBeCalledTimes(1);
            getLatestCallParams(mockEditRecord)[1].onSuccess();
        });

        expect(mockRefetch).toBeCalledTimes(1);
    });
});

describe("<StudentEntryExit /> filtering records history table by this month, last month, and this year", () => {
    const mockAddRecord = jest.fn();
    const mockEditRecord = jest.fn();
    const mockDeleteRecord = jest.fn();
    const mockRefetch = jest.fn();

    beforeEach(() => {
        (inferQueryPagination as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: "entryExitGetManyStudentRecordsByDate";
                }) =>
                (params: {
                    filter: EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables;
                }) => {
                    const { start_date, end_date } = params.filter;

                    const data = getMockEntryExitRecordsFilterData(start_date, end_date);

                    return {
                        data: data,
                        result: {
                            isLoading: false,
                            refetch: mockRefetch,
                        },
                        pagination: getMockEntryExitRecordsPagination(),
                    };
                }
        );

        (useAddEntryExitRecord as jest.Mock).mockImplementation(() => ({
            addEntryExitRecord: mockAddRecord,
        }));

        (useEditEntryExitRecord as jest.Mock).mockImplementation(() => ({
            editEntryExitRecord: mockEditRecord,
        }));

        (useDeleteEntryExitRecord as jest.Mock).mockImplementation(() => ({
            deleteEntryExitRecord: mockDeleteRecord,
        }));

        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });
        const wrapper = renderComponent(statusEnrolled);
        const selectInput = wrapper.getByRole("button", { name: "Date filter" });
        //click dropdown
        userEvent.click(selectInput);
    });

    it("should display this month's records when 'This month' is selected", async () => {
        const mockThisMonthRecords = getMockEntryExitRecordsDataThisMonth();
        const optionsWrapper = screen.getByRole("listbox");
        // click this month
        userEvent.click(within(optionsWrapper).getByRole("option", { name: "This month" }));
        const recordRowList = screen.getAllByTestId("TableBase__row");

        await waitFor(() => {
            recordRowList.forEach((_, i) => {
                expect(
                    within(recordRowList[i]).getByTestId(
                        "StudentEntryExitRecordsTableCell__columnDate"
                    )
                ).toHaveTextContent(
                    `${formatDate(mockThisMonthRecords[i].entry_at, "yyyy/LL/dd")}`
                );
            });
        });
        expect(recordRowList).toHaveLength(mockThisMonthRecords.length);
    });

    it("should display last month's records when 'Last month' is selected", async () => {
        const mockLastMonthRecords = getMockEntryExitRecordsDataLastMonth();
        const optionsWrapper = screen.getByRole("listbox");
        // click last month
        userEvent.click(within(optionsWrapper).getByRole("option", { name: "Last month" }));
        const recordRowList = screen.getAllByTestId("TableBase__row");

        await waitFor(() => {
            mockLastMonthRecords.forEach((_, i) => {
                expect(
                    within(recordRowList[i]).getByTestId(
                        "StudentEntryExitRecordsTableCell__columnDate"
                    )
                ).toHaveTextContent(
                    `${formatDate(mockLastMonthRecords[i].entry_at, "yyyy/LL/dd")}`
                );
            });
        });
        expect(recordRowList).toHaveLength(mockLastMonthRecords.length);
    });

    it("should display this year's records when 'This year' is selected", async () => {
        const mockThisYearRecords = getMockEntryExitRecordsDataThisYear();
        const optionsWrapper = screen.getByRole("listbox");
        // click this year
        userEvent.click(within(optionsWrapper).getByRole("option", { name: "This year" }));
        const recordRowList = screen.getAllByTestId("TableBase__row");

        await waitFor(() => {
            recordRowList.forEach((_, i) => {
                expect(
                    within(recordRowList[i]).getByTestId(
                        "StudentEntryExitRecordsTableCell__columnDate"
                    )
                ).toHaveTextContent(`${formatDate(mockThisYearRecords[i].entry_at, "yyyy/LL/dd")}`);
            });
        });
        expect(recordRowList).toHaveLength(mockThisYearRecords.length);
    });
});
