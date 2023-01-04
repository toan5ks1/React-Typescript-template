import {
    createMockDataSelectedItemsWithCustomStatus,
    mockStudyPlanItemsTableData,
} from "src/squads/syllabus/test-utils/study-plan";

import HookForm from "src/components/Forms/HookForm";
import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import { StudyPlanItemWithLoInfo } from "../../../common/types";
import { BulkActions } from "../BulkActions";

import { fireEvent, render, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import { StudyPlanItemStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import useBulkActionUpdate from "src/squads/syllabus/pages/StudyPlan/hooks/studyPlanItemTable/useBulkActionUpdate";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

const data = mockStudyPlanItemsTableData({});
const selectedItems = data[0].studyPlanItems;

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/syllabus/pages/StudyPlan/hooks/studyPlanItemTable/useBulkActionUpdate",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

const renderBulkActions = (selectedItems: StudyPlanItemWithLoInfo[]) => {
    return render(
        <TestThemeProvider>
            <MuiPickersUtilsProvider>
                <TestTranslationProvider>
                    <HookForm>
                        <BulkActions selectedItems={selectedItems} />
                    </HookForm>
                </TestTranslationProvider>
            </MuiPickersUtilsProvider>
        </TestThemeProvider>
    );
};

afterAll(() => {
    jest.clearAllMocks();
});

describe(BulkActions.name, () => {
    let isEnabled: boolean;
    let dialogContextLabel: string;
    const handleUpdateShowHide = jest.fn();

    beforeEach(() => {
        isEnabled = true;
        dialogContextLabel = "";

        (useFeatureToggle as jest.Mock).mockImplementation(() => ({
            isEnabled,
        }));

        (useBulkActionUpdate as jest.Mock).mockImplementation(() => ({
            dialogContext: {
                label: dialogContextLabel,
                fieldName: "",
            },
            setDialogContext: () => {},
            handleUpdateShowHide,
        }));
    });

    it("should render correctly with menu list", () => {
        renderBulkActions(selectedItems);

        const bulkActionButton = screen.getByTestId(/ButtonDropdownMenu__button/);

        expect(bulkActionButton).toBeInTheDocument();

        fireEvent.click(bulkActionButton);

        const dropdownMenu = screen.getByTestId(/ButtonDropdownMenu__popover/);
        expect(dropdownMenu).toBeInTheDocument();

        const menuItems = screen.getAllByRole(/menuitem/);
        expect(menuItems.length).toBe(5);
    });

    it("should disabled all menu-items if there is no study plan item selected", () => {
        renderBulkActions([]);
        const bulkActionButton = screen.getByTestId(/ButtonDropdownMenu__button/);

        fireEvent.click(bulkActionButton);

        const menuItems = screen.getAllByRole(/menuitem/);

        menuItems.forEach((item) => {
            expect(item).toHaveAttribute("aria-disabled", "true");
        });
    });

    it("should set dialog context with right label and field name when select 1st menu item", () => {
        dialogContextLabel = "Available From";
        renderBulkActions(selectedItems);

        const bulkActionButton = screen.getByTestId(/ButtonDropdownMenu__button/);

        fireEvent.click(bulkActionButton);

        const menuItems = screen.getAllByRole(/menuitem/);

        fireEvent.click(menuItems[0]);

        const dialog = screen.getByTestId("BulkEditStudyPlanItem__dialog");

        expect(dialog).toBeInTheDocument();
        const datePickerLabel = screen.getByLabelText(/Available From/i);
        expect(datePickerLabel).toBeInTheDocument();
    });

    it("should set dialog context with right label and field name when select 3rd menu item", () => {
        dialogContextLabel = "Start";
        renderBulkActions(selectedItems);

        const bulkActionButton = screen.getByTestId(/ButtonDropdownMenu__button/);

        fireEvent.click(bulkActionButton);

        const menuItems = screen.getAllByRole(/menuitem/);

        fireEvent.click(menuItems[2]);

        const dialog = screen.getByTestId("BulkEditStudyPlanItem__dialog");

        expect(dialog).toBeInTheDocument();
        const datePickerLabel = screen.getByLabelText(/Start/i);
        expect(datePickerLabel).toBeInTheDocument();
    });

    it("should not display dialog context when select 'Show/Hide' menu item", () => {
        renderBulkActions(selectedItems);

        const bulkActionButton = screen.getByTestId("ButtonDropdownMenu__button");

        fireEvent.click(bulkActionButton);

        const menuItems = screen.getAllByRole(/menuitem/i);

        fireEvent.click(menuItems[4]);

        const dialog = screen.queryByTestId("BulkEditStudyPlanItem__dialog");

        expect(dialog).not.toBeInTheDocument();
    });

    it("should not display 'Show all' menu item if feature toggle is disabled", () => {
        isEnabled = false;
        renderBulkActions(selectedItems);

        const bulkActionButton = screen.getByTestId("ButtonDropdownMenu__button");

        fireEvent.click(bulkActionButton);

        const menuItems = screen.getAllByRole(/menuitem/i);
        expect(menuItems.length).toBe(4);

        const showAllMenuItem = screen.queryByRole("menuitem", { name: /Show All/i });
        expect(showAllMenuItem).not.toBeInTheDocument();
    });

    it(`should display 'Hide All' menu item if all selected items have status is ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE}`, () => {
        const selectedItemsWithCustomStatus = createMockDataSelectedItemsWithCustomStatus(
            selectedItems,
            "active"
        );
        renderBulkActions(selectedItemsWithCustomStatus);

        const bulkActionButton = screen.getByTestId("ButtonDropdownMenu__button");

        fireEvent.click(bulkActionButton);

        expect(screen.getByText(/Hide All/i)).toBeInTheDocument();

        const menuItems = screen.getAllByRole(/menuitem/i);

        fireEvent.click(menuItems[4]);

        expect(handleUpdateShowHide).toHaveBeenCalledWith("hideAll");
    });

    it(`should display 'Show All' menu item if all selected items have status is ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED}`, () => {
        const selectedItemsWithCustomStatus = createMockDataSelectedItemsWithCustomStatus(
            selectedItems,
            "archived"
        );
        renderBulkActions(selectedItemsWithCustomStatus);

        const bulkActionButton = screen.getByTestId("ButtonDropdownMenu__button");

        fireEvent.click(bulkActionButton);

        expect(screen.getByText(/Show All/i)).toBeInTheDocument();

        const menuItems = screen.getAllByRole(/menuitem/i);

        fireEvent.click(menuItems[4]);

        expect(handleUpdateShowHide).toHaveBeenCalledWith("showAll");
    });

    it(`should display 'Show All' menu item if all selected items have a mixed status with ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE} and ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED}`, () => {
        const selectedItemsWithCustomStatus = createMockDataSelectedItemsWithCustomStatus(
            selectedItems,
            "mixed"
        );
        renderBulkActions(selectedItemsWithCustomStatus);

        const bulkActionButton = screen.getByTestId("ButtonDropdownMenu__button");

        fireEvent.click(bulkActionButton);

        expect(screen.getByText(/Show All/i)).toBeInTheDocument();

        const menuItems = screen.getAllByRole(/menuitem/i);

        fireEvent.click(menuItems[4]);

        expect(handleUpdateShowHide).toHaveBeenCalledWith("showAll");
    });
});
