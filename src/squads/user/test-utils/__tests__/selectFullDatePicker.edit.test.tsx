import { DateTime } from "luxon";
import { useForm } from "react-hook-form";

import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { selectFullDatePicker } from "../date-time-picker-helper";

import { render, screen } from "@testing-library/react";

describe("selectFullDatePicker DialogWithHeaderFooterHF", () => {
    const ComponentTest = () => {
        const methods = useForm({ defaultValues: { date: new Date() } });
        return (
            <DialogWithHeaderFooterHF methods={methods} open={true} onClose={() => {}}>
                <DatePickerHF name="date" data-testid="ComponentTest__date" />
            </DialogWithHeaderFooterHF>
        );
    };
    const renderComponent = () => {
        return render(
            <MuiPickersUtilsProvider>
                <ComponentTest />
            </MuiPickersUtilsProvider>
        );
    };

    it.skip("should select a date from today to three next year", async () => {
        const wrapper = renderComponent();

        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 3);

        const datePicker = screen.getByTestId("ComponentTest__date");

        for (
            let currentDate = new Date();
            currentDate < nextYear;
            currentDate.setDate(currentDate.getDate() + 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, currentDate);
            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(currentDate).toFormat("yyyy/LL/dd")
            );
        }
    }, 550000);

    it.skip("should select a date from three year ago to today", async () => {
        const wrapper = renderComponent();

        const oneYearAgo = new Date();

        const datePicker = screen.getByTestId("ComponentTest__date");
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 3);

        for (
            let currentDate = new Date();
            currentDate > oneYearAgo;
            currentDate.setDate(currentDate.getDate() - 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, currentDate);
            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(currentDate).toFormat("yyyy/LL/dd")
            );
        }
    }, 550000);

    it.skip("should select current date each year", async () => {
        const wrapper = renderComponent();

        const now = new Date();
        const maxYear = new Date(2050, now.getMonth(), now.getDate());

        const datePicker = screen.getByTestId("ComponentTest__date");

        for (
            let year = new Date(1950, now.getMonth(), now.getDate());
            year <= maxYear;
            year.setFullYear(year.getFullYear() + 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, year);

            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(year).toFormat("yyyy/LL/dd")
            );
        }
    }, 150000);

    it.skip("should select current date each month in four year", async () => {
        const wrapper = renderComponent();

        const now = new Date();
        const maxYear = new Date();
        maxYear.setFullYear(maxYear.getFullYear() + 2);

        const datePicker = screen.getByTestId("ComponentTest__date");

        for (
            let year = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
            year <= maxYear;
            year.setMonth(year.getMonth() + 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, year);

            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(year).toFormat("yyyy/LL/dd")
            );
        }
    }, 100000);
});

describe("selectFullDatePicker DialogFullScreenHF", () => {
    const ComponentTest = () => {
        const methods = useForm({ defaultValues: { date: new Date() } });
        return (
            <DialogFullScreenHF methods={methods} open={true} onClose={() => {}} title={""}>
                <DatePickerHF name="date" data-testid="ComponentTest__date" />
            </DialogFullScreenHF>
        );
    };
    const renderComponent = () => {
        return render(
            <MuiPickersUtilsProvider>
                <ComponentTest />
            </MuiPickersUtilsProvider>
        );
    };

    it.skip("should select a date from today to three next year", async () => {
        const wrapper = renderComponent();

        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 3);

        const datePicker = screen.getByTestId("ComponentTest__date");

        for (
            let currentDate = new Date();
            currentDate < nextYear;
            currentDate.setDate(currentDate.getDate() + 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, currentDate);
            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(currentDate).toFormat("yyyy/LL/dd")
            );
        }
    }, 550000);

    it.skip("should select a date from three year ago to today", async () => {
        const wrapper = renderComponent();

        const oneYearAgo = new Date();

        const datePicker = screen.getByTestId("ComponentTest__date");
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 3);

        for (
            let currentDate = new Date();
            currentDate > oneYearAgo;
            currentDate.setDate(currentDate.getDate() - 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, currentDate);
            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(currentDate).toFormat("yyyy/LL/dd")
            );
        }
    }, 550000);

    it.skip("should select current date each year", async () => {
        const wrapper = renderComponent();

        const now = new Date();
        const maxYear = new Date(2050, now.getMonth(), now.getDate());

        const datePicker = screen.getByTestId("ComponentTest__date");

        for (
            let year = new Date(1950, now.getMonth(), now.getDate());
            year <= maxYear;
            year.setFullYear(year.getFullYear() + 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, year);

            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(year).toFormat("yyyy/LL/dd")
            );
        }
    }, 150000);

    it.skip("should select current date each month in four year", async () => {
        const wrapper = renderComponent();

        const now = new Date();
        const maxYear = new Date();
        maxYear.setFullYear(maxYear.getFullYear() + 2);

        const datePicker = screen.getByTestId("ComponentTest__date");

        for (
            let year = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
            year <= maxYear;
            year.setMonth(year.getMonth() + 1)
        ) {
            await selectFullDatePicker(wrapper, datePicker, year);

            expect(datePicker.querySelector("input")).toHaveValue(
                DateTime.fromJSDate(year).toFormat("yyyy/LL/dd")
            );
        }
    }, 100000);
});
