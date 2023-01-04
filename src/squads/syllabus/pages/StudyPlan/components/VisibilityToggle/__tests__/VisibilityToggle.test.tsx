import { useFormContext } from "react-hook-form";

import VisibilityToggle, { VisibilityToggleProps } from "..";
import { StudyPlanItemStatusKey } from "../../../common/constants";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
    };
});

const defaultProps: VisibilityToggleProps = {
    studyPlanItemId: "studyPlanItem",
    status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
};

describe(VisibilityToggle.name, () => {
    const setValue = jest.fn();

    beforeEach(() => {
        (useFormContext as jest.Mock).mockImplementation(() => ({
            setValue,
            register: jest.fn(),
        }));
    });

    it(`should render with show icon when status is ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE}`, () => {
        render(
            <TestHookFormProvider>
                <VisibilityToggle {...defaultProps} />
            </TestHookFormProvider>
        );

        expect(screen.getByTestId("ButtonShowHide__iconShow")).toBeInTheDocument();
    });

    it(`should render with hide icon when status is ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED}`, () => {
        render(
            <TestHookFormProvider>
                <VisibilityToggle
                    {...defaultProps}
                    status={StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED}
                />
            </TestHookFormProvider>
        );

        expect(screen.getByTestId("ButtonShowHide__iconHide")).toBeInTheDocument();
    });

    it(`should call onActive when click button with status is ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE}`, async () => {
        render(
            <TestHookFormProvider>
                <VisibilityToggle {...defaultProps} />
            </TestHookFormProvider>
        );

        fireEvent.click(screen.getByTestId("ButtonShowHide__iconShow"));

        await waitFor(() =>
            expect(setValue).toBeCalledWith(
                `studyPlanItem.${defaultProps.studyPlanItemId}.status`,
                StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
                {
                    shouldDirty: true,
                }
            )
        );
    });

    it(`should call onInactive when click button with status is ${StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED}`, async () => {
        render(
            <TestHookFormProvider>
                <VisibilityToggle
                    {...defaultProps}
                    status={StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED}
                />
            </TestHookFormProvider>
        );

        fireEvent.click(screen.getByTestId("ButtonShowHide__iconHide"));

        await waitFor(() =>
            expect(setValue).toBeCalledWith(
                `studyPlanItem.${defaultProps.studyPlanItemId}.status`,
                StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                {
                    shouldDirty: true,
                }
            )
        );
    });
});
