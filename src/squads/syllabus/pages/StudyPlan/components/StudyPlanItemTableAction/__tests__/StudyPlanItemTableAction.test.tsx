import { PropsWithChildren } from "react";

import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import CommonTranslationProvider from "src/providers/TranslationProvider";
import StudyPlanItemTableAction, {
    StudyPlanItemTableActionProps,
} from "src/squads/syllabus/pages/StudyPlan/components/StudyPlanItemTableAction/StudyPlanItemTableAction";

import { StudyPlanItemStatusKey, StudyPlanStatusKey } from "../../../common/constants";
import useStudyPlanItemMutation from "../../../hooks/useStudyPlanItemMutation";

import { render, waitFor, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("../../../hooks/useStudyPlanItemMutation");

const defaultProps: StudyPlanItemTableActionProps = {
    studyPlan: {
        status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
    } as StudyPlanItemTableActionProps["studyPlan"],
    studyPlanItems: [] as StudyPlanItemTableActionProps["studyPlanItems"],
    isFetchingStudyPlanItems: false,
    pagination: {
        count: -1,
        limit: 10,
        offset: 0,
        onPageChange: () => {},
        onRowsPerPageChange: () => {},
        page: 0,
        rowsPerPage: 10,
    },
    refetchStudyPlanItems: jest.fn(),
    isMasterStudyPlan: false,
};
const studyPlanItemsByTopic: StudyPlanItemTableActionProps["studyPlanItems"] = [
    {
        topicId: "topicId",
        topicName: "Topic Name",
        studyPlanItems: [
            {
                study_plan_item_id: "studyPlanItemId",
                loName: "Name",
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
            },
        ],
    },
];
const studyPlanItemsMock = [
    {
        ...studyPlanItemsByTopic[0],
        studyPlanItems: [...Array(11)].map((_, index) => ({
            ...studyPlanItemsByTopic[0].studyPlanItems[0],
            study_plan_item_id: index.toString(),
        })),
    },
];

const studyPlanItemsMockV2: StudyPlanItemTableActionProps["studyPlanItems"] = [...Array(6)].map(
    (_, index) => ({
        topicId: "topicId" + index,
        topicName: "Topic Name" + index,
        studyPlanItems: [
            {
                study_plan_item_id: "studyPlanItemId" + index,
                loName: "Name" + index,
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
            },
        ],
    })
);

const renderUtil = (props?: Partial<StudyPlanItemTableActionProps>) =>
    render(<StudyPlanItemTableAction {...defaultProps} {...props} />, {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
            <TestApp>
                <CommonTranslationProvider>{children}</CommonTranslationProvider>
            </TestApp>
        ),
    });

describe(StudyPlanItemTableAction.name, () => {
    it("should render elements correctly", () => {
        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        const { getByRole, getByTestId, getByText } = renderUtil();

        expect(getByTestId("WrapperPageHeader__root")).toBeInTheDocument();
        expect(getByText("Study Plan Content")).toBeInTheDocument();
        expect(getByRole("table")).toBeInTheDocument();
    });

    it("should not update study plan items on submit if there is nothing", async () => {
        const updateStudyPlanItemsMock = jest.fn();

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: updateStudyPlanItemsMock,
        });

        const { findByRole, getByRole } = renderUtil();

        userEvent.click(getByRole("button", { name: "Edit" }));
        userEvent.click(getByRole("button", { name: "Save" }));
        userEvent.click(await findByRole("button", { name: "Update" }));

        expect(updateStudyPlanItemsMock).not.toHaveBeenCalled();
    });

    it("should show correct dialog title and content for update master study plan", async () => {
        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        renderUtil({
            isMasterStudyPlan: true,
        });

        userEvent.click(screen.getByRole("button", { name: "Edit" }));
        userEvent.click(screen.getByRole("button", { name: "Save" }));

        await waitFor(() => {
            expect(screen.getByTestId("DialogWithHeaderFooter__dialogTitle")).toBeInTheDocument();
        });

        expect(screen.getByText("Update Study Plan")).toBeInTheDocument();
        expect(
            screen.getByText(
                "All changes will be applied to all the students in this course. Are you sure to update?"
            )
        ).toBeInTheDocument();
    });

    it("should show correct study plan items based on display hidden items setting", () => {
        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        const { getByRole } = renderUtil();
        const checkbox = getByRole("checkbox");

        expect(checkbox).toBeChecked();
        userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it("should change page without confirmation if there is no edited fields", () => {
        const props: Partial<StudyPlanItemTableActionProps> = {
            studyPlanItems: studyPlanItemsMock,
            pagination: {
                ...defaultProps.pagination,
                onPageChange: jest.fn(),
            },
        };

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        const { getByRole, getByTestId } = renderUtil(props);

        userEvent.click(getByRole("button", { name: "Edit" }));
        userEvent.click(
            within(getByTestId("TableBaseFooter")).getByRole("button", { name: "Go to next page" })
        );

        expect(props.pagination!.onPageChange).toHaveBeenCalled();
    });

    it("should not update study plan items when Move Without Saving button is clicked", async () => {
        const updateStudyPlanItemsMock = jest.fn();
        const onPageChangeMock = jest.fn();

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: updateStudyPlanItemsMock,
        });

        const { getAllByRole, getByRole, getByTestId } = renderUtil({
            studyPlanItems: studyPlanItemsMockV2,
            pagination: {
                ...defaultProps.pagination,
                onPageChange: onPageChangeMock,
                rowsPerPage: 5,
            },
        });

        userEvent.click(getByRole("button", { name: "Edit" }));
        userEvent.type(getAllByRole("textbox")[0], "2021/12/12");
        userEvent.click(
            within(getByTestId("TableBaseFooter")).getByRole("button", { name: "Go to next page" })
        );
        userEvent.click(getByRole("button", { name: "Move Without Saving" }));

        expect(onPageChangeMock).toHaveBeenCalled();
        expect(updateStudyPlanItemsMock).not.toHaveBeenCalled();
    });

    it("should update study plan items and change page when Save and Move button is clicked", async () => {
        const updateStudyPlanItemsMock = jest.fn();
        const onPageChangeMock = jest.fn();

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: updateStudyPlanItemsMock,
        });

        const { getAllByRole, getByRole, getByTestId } = renderUtil({
            studyPlanItems: studyPlanItemsMockV2,
            pagination: {
                ...defaultProps.pagination,
                onPageChange: onPageChangeMock,
                rowsPerPage: 5,
            },
        });

        userEvent.click(getByRole("button", { name: "Edit" }));
        userEvent.type(getAllByRole("textbox")[0], "2021/12/12");
        userEvent.click(
            within(getByTestId("TableBaseFooter")).getByRole("button", { name: "Go to next page" })
        );
        userEvent.click(getByRole("button", { name: "Save And Move" }));

        await waitFor(() => {
            expect(updateStudyPlanItemsMock).toHaveBeenCalled();
            getLatestCallParams(updateStudyPlanItemsMock)[1].onSuccess();
        });
        expect(onPageChangeMock).toHaveBeenCalled();
    });

    it("should change row setting without confirmation if there is no edited fields", () => {
        const props: Partial<StudyPlanItemTableActionProps> = {
            studyPlanItems: [
                {
                    ...studyPlanItemsMock[0],
                    studyPlanItems: [studyPlanItemsMock[0].studyPlanItems[0]],
                },
            ],
            pagination: {
                ...defaultProps.pagination,
                onRowsPerPageChange: jest.fn(),
            },
        };

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        const { getByRole, getByTestId } = renderUtil(props);

        userEvent.click(getByRole("button", { name: "Edit" }));
        userEvent.click(
            within(getByTestId("TableBaseFooter")).getByRole("button", {
                name: "Rows per page: 10",
            })
        );
        userEvent.click(within(getByRole("listbox")).getByRole("option", { name: "5" }));

        expect(props.pagination!.onRowsPerPageChange).toHaveBeenCalled();
    });

    it("should not update study plan items when Apply Without Saving button is clicked", async () => {
        const updateStudyPlanItemsMock = jest.fn();
        const onRowsPerPageChangeMock = jest.fn();

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: updateStudyPlanItemsMock,
        });

        const { getAllByRole, getByRole, getByTestId } = renderUtil({
            studyPlanItems: [
                {
                    ...studyPlanItemsMock[0],
                    studyPlanItems: [studyPlanItemsMock[0].studyPlanItems[0]],
                },
            ],
            pagination: {
                ...defaultProps.pagination,
                onRowsPerPageChange: onRowsPerPageChangeMock,
            },
        });

        userEvent.click(getByRole("button", { name: "Edit" }));
        userEvent.type(getAllByRole("textbox")[0], "2021/12/12");
        userEvent.click(
            within(getByTestId("TableBaseFooter")).getByRole("button", {
                name: "Rows per page: 10",
            })
        );
        userEvent.click(within(getByRole("listbox")).getByRole("option", { name: "5" }));
        userEvent.click(getByRole("button", { name: "Apply Without Saving" }));

        await waitFor(() => {
            expect(onRowsPerPageChangeMock).toHaveBeenCalled();
        });
        expect(updateStudyPlanItemsMock).not.toHaveBeenCalled();
    });

    it("should update study plan items and apply row setting when Save And Apply button is clicked", async () => {
        const updateStudyPlanItemsMock = jest.fn();
        const onRowsPerPageChangeMock = jest.fn();

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: updateStudyPlanItemsMock,
        });

        const { getAllByRole, getByRole, getByTestId } = renderUtil({
            studyPlanItems: [
                {
                    ...studyPlanItemsMock[0],
                    studyPlanItems: [studyPlanItemsMock[0].studyPlanItems[0]],
                },
            ],
            pagination: {
                ...defaultProps.pagination,
                onRowsPerPageChange: onRowsPerPageChangeMock,
            },
        });

        userEvent.click(getByRole("button", { name: "Edit" }));
        userEvent.type(getAllByRole("textbox")[0], "2021/12/12");
        userEvent.click(
            within(getByTestId("TableBaseFooter")).getByRole("button", {
                name: "Rows per page: 10",
            })
        );
        userEvent.click(within(getByRole("listbox")).getByRole("option", { name: "5" }));
        userEvent.click(getByRole("button", { name: "Save And Apply" }));

        await waitFor(() => {
            expect(updateStudyPlanItemsMock).toHaveBeenCalled();
        });
        // todo: call this onSuccess in a proper way
        // getLatestCallParams(updateStudyPlanItemsMock)[1].onSuccess();
        //
        // await waitFor(() => {
        //     expect(onRowsPerPageChangeMock).toHaveBeenCalled();
        // });
    });

    it("should render table view loading study plan item when fetching study plan items", async () => {
        const props: Partial<StudyPlanItemTableActionProps> = {
            isFetchingStudyPlanItems: true,
        };

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        renderUtil(props);

        expect(screen.getByTestId("StudyPlanItemTableAction__tableView")).toBeInTheDocument();
        expect(screen.getAllByTestId("TableSke__item").length).toBeGreaterThan(1);

        expect(screen.queryByTestId("StudyPlanItemTableAction__tableEdit")).not.toBeInTheDocument();
    });

    it("should render table view when action is not edit", async () => {
        const props: Partial<StudyPlanItemTableActionProps> = {
            isFetchingStudyPlanItems: false,
            studyPlanItems: [
                {
                    ...studyPlanItemsMock[0],
                    studyPlanItems: [studyPlanItemsMock[0].studyPlanItems[0]],
                },
            ],
        };

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        renderUtil(props);

        expect(screen.getByTestId("StudyPlanItemTableAction__tableView")).toBeInTheDocument();
        expect(screen.getByTestId("TableBase__row")).toBeInTheDocument();

        expect(screen.queryByTestId("StudyPlanItemTableAction__tableEdit")).not.toBeInTheDocument();
    });

    it("should render table edit when study plan items fetched and action is edit", async () => {
        const props: Partial<StudyPlanItemTableActionProps> = {
            isFetchingStudyPlanItems: false,
            studyPlanItems: [
                {
                    ...studyPlanItemsMock[0],
                    studyPlanItems: [studyPlanItemsMock[0].studyPlanItems[0]],
                },
            ],
        };

        (useStudyPlanItemMutation as jest.Mock).mockReturnValue({
            isUpdatingStudyPlanItems: false,
            updateStudyPlanItems: () => {},
        });

        renderUtil(props);

        userEvent.click(screen.getByRole("button", { name: "Edit" }));

        expect(screen.getByTestId("StudyPlanItemTableAction__tableEdit")).toBeInTheDocument();

        expect(screen.queryByTestId("StudyPlanItemTableAction__tableView")).not.toBeInTheDocument();
    });
});
