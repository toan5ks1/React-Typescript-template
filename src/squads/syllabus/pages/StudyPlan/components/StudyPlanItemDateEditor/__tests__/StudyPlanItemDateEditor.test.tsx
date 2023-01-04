import { useForm } from "react-hook-form";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";

import StudyPlanItemDateEditor from "..";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

describe(StudyPlanItemDateEditor.name, () => {
    it("should render correctly", () => {
        const date = new Date(2021, 8, 30);
        const { getByRole } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor
                    studyPlanItemId=""
                    fieldName="availableFrom"
                    value={date.toISOString()}
                />
            </TestHookFormProvider>
        );

        expect(getByRole("textbox")).toHaveAttribute("placeholder", "yyyy/mm/dd, hh:mm");
    });

    it("should select text on focus", () => {
        const date = new Date(2021, 8, 30);
        const { container } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor
                    studyPlanItemId=""
                    fieldName="availableFrom"
                    value={date.toISOString()}
                />
            </TestHookFormProvider>
        );
        const textField = container.querySelector("input")!;

        fireEvent.focus(textField);

        expect(textField.selectionStart).toBe(0);
        expect(textField.selectionEnd).toBe(textField.value.length);
    });

    it("should not set default time when input is empty", () => {
        const { getByRole } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="availableFrom" value="" />
            </TestHookFormProvider>
        );
        const textField = getByRole("textbox");

        fireEvent.blur(textField);

        expect(textField).toHaveValue("");
    });

    it("should not set default time when input format is invalid", () => {
        const { getByRole } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="availableFrom" value="" />
            </TestHookFormProvider>
        );
        const textField = getByRole("textbox");

        fireEvent.change(textField, { target: { value: "invalid format" } });
        fireEvent.blur(textField);

        expect(textField).toHaveValue("invalid format");
    });

    it("should fill time as 00:00 for Available From when time is not inputted", () => {
        const { getByRole } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="availableFrom" value="" />
            </TestHookFormProvider>
        );
        const textField = getByRole("textbox");

        fireEvent.change(textField, { target: { value: "2021/10/19" } });
        fireEvent.blur(textField);

        expect(textField).toHaveValue("2021/10/19, 00:00");
    });

    it("should fill time as 23:59 for Available Until when time is not inputted", () => {
        const { getByRole } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="availableTo" value="" />
            </TestHookFormProvider>
        );
        const textField = getByRole("textbox");

        fireEvent.change(textField, { target: { value: "2021/10/19" } });
        fireEvent.blur(textField);

        expect(textField).toHaveValue("2021/10/19, 23:59");
    });

    it("should fill End Date when Start Date is inputted and valid", () => {
        const { getAllByRole } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="startDate" value="" />
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="endDate" value="" />
            </TestHookFormProvider>
        );
        const [startDateField, endDateField] = getAllByRole("textbox");

        fireEvent.change(startDateField, { target: { value: "2021/10/19, 00:00" } });
        fireEvent.blur(startDateField);

        expect(endDateField).toHaveValue("2021/10/26, 23:59");
    });

    it("should fill End Date within Available Until when Start Date is inputted and valid", () => {
        const { getAllByRole } = render(
            <TestHookFormProvider>
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="availableTo" value="" />
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="startDate" value="" />
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="endDate" value="" />
            </TestHookFormProvider>
        );
        const [availableUntilField, startDateField, endDateField] = getAllByRole("textbox");

        fireEvent.change(availableUntilField, { target: { value: "2021/10/20, 23:59" } });
        fireEvent.change(startDateField, { target: { value: "2021/10/19, 00:00" } });
        fireEvent.blur(startDateField);

        expect(endDateField).toHaveValue("2021/10/20, 23:59");
    });

    it("should fill End Date within Available Until when Start Date is inputted and valid", async () => {
        const submit = jest.fn();
        const WrapperComponent = () => {
            const methods = useForm();
            return (
                <TestHookFormProvider methodsOverride={methods}>
                    <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="startDate" value="" />
                    <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="endDate" value="" />
                    <button onClick={methods.handleSubmit(submit)} data-testid="submit" />
                </TestHookFormProvider>
            );
        };

        render(<WrapperComponent />);
        const [startDateField] = screen.getAllByRole("textbox");

        fireEvent.change(startDateField, { target: { value: "2021/10/19, 00:00" } });
        fireEvent.blur(startDateField);

        fireEvent.click(screen.getByTestId("submit"));

        await waitFor(() => {
            expect(submit).toBeCalled();
        });

        expect(getCallParamsAt(submit, 0)[0].studyPlanItem).toEqual({
            id: {
                endDate: "2021/10/26, 23:59",
                startDate: "2021/10/19, 00:00",
            },
        });
    });

    it("shouldn't change End Date when Start Date is inputted and End Date is filled", () => {
        const endDate = "2021/10/20, 23:59";
        const { getAllByRole } = render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: {
                        "studyPlanItem.id.endDate": endDate,
                    },
                }}
            >
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="startDate" value="" />
                <StudyPlanItemDateEditor studyPlanItemId="id" fieldName="endDate" value={endDate} />
            </TestHookFormProvider>
        );
        const [startDateField, endDateField] = getAllByRole("textbox");

        const startDate = "2021/10/19, 00:00";
        fireEvent.change(startDateField, { target: { value: startDate } });
        fireEvent.blur(startDateField);

        expect(startDateField).toHaveValue(startDate);
        expect(endDateField).toHaveValue(endDate);
    });
});
