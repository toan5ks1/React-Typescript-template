import AutocompleteAttendanceStatus, {
    AutocompleteAttendanceStatusProps,
} from "../AutocompleteAttendanceStatus";

import { RenderResult, within, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withTranslateProviderByLocale } from "src/squads/lesson/test-utils/HOCs";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

const checkAutocompletePopper = async (wrapper: RenderResult, visible: boolean) => {
    await waitFor(() => {
        const autocompletePopper =
            wrapper.baseElement.getElementsByClassName("MuiAutocomplete-popper");

        const autocompletePopperElement = autocompletePopper.item(0);
        if (visible) expect(autocompletePopperElement).toBeVisible();
        else expect(autocompletePopperElement).not.toBeInTheDocument();
    });
};

const dataTestId = "AutocompleteAttendanceStatus__autocomplete";
const props: AutocompleteAttendanceStatusProps = {
    onChange: jest.fn(),
    [`${"data-testid"}`]: dataTestId,
    limitChipText: "Ellipsis",
    getOptionSelectedField: "key",
};

describe("<AutocompleteAttendanceStatus /> testing for english", () => {
    it("should open options", async () => {
        const { wrapper, changeLocale } = withTranslateProviderByLocale({
            lang: LanguageEnums.EN,
            children: <AutocompleteAttendanceStatus {...props} />,
        });

        await changeLocale();

        const autocomplete = wrapper.getByTestId(dataTestId);
        const autocompleteInput = within(autocomplete).getByTestId("AutocompleteBase__input");
        userEvent.click(autocompleteInput);

        expect(screen.getByText("Attend")).toBeVisible();
        expect(screen.getByText("Absent")).toBeVisible();
        expect(screen.getByText("Absent (informed)")).toBeVisible();
        expect(screen.getByText("Late")).toBeVisible();
        expect(screen.getByText("Late (informed)")).toBeVisible();
        expect(screen.getByText("Leave Early")).toBeVisible();
    });

    it("should call onChange function", async () => {
        const { wrapper, changeLocale } = withTranslateProviderByLocale({
            lang: LanguageEnums.EN,
            children: <AutocompleteAttendanceStatus {...props} />,
        });

        await changeLocale();

        const autocomplete = wrapper.getByTestId(dataTestId);
        const autocompleteInput = within(autocomplete).getByTestId("AutocompleteBase__input");
        userEvent.click(autocompleteInput);

        await checkAutocompletePopper(wrapper, true);

        const lateStatusText = "Late";
        const lateOption = screen.getByText(lateStatusText);
        userEvent.click(lateOption);

        await checkAutocompletePopper(wrapper, false);

        expect(autocompleteInput).toHaveValue(lateStatusText);
    });
});

describe("<AutocompleteAttendanceStatus /> testing for japanese", () => {
    it("should open options", async () => {
        const { wrapper, changeLocale } = withTranslateProviderByLocale({
            lang: LanguageEnums.JA,
            children: <AutocompleteAttendanceStatus {...props} />,
        });

        await changeLocale();

        const autocomplete = wrapper.getByTestId(dataTestId);
        const autocompleteInput = within(autocomplete).getByTestId("AutocompleteBase__input");
        userEvent.click(autocompleteInput);

        expect(screen.getByText("出席")).toBeVisible();
        expect(screen.getByText("欠席")).toBeVisible();
        expect(screen.getByText("欠席 (事前連絡)")).toBeVisible();
        expect(screen.getByText("遅刻")).toBeVisible();
        expect(screen.getByText("遅刻 (事前連絡)")).toBeVisible();
        expect(screen.getByText("早退")).toBeVisible();
    });

    it("should call onChange function", async () => {
        const { wrapper, changeLocale } = withTranslateProviderByLocale({
            lang: LanguageEnums.JA,
            children: <AutocompleteAttendanceStatus {...props} />,
        });

        await changeLocale();

        const autocomplete = wrapper.getByTestId(dataTestId);
        const autocompleteInput = within(autocomplete).getByTestId("AutocompleteBase__input");
        userEvent.click(autocompleteInput);

        await checkAutocompletePopper(wrapper, true);

        const lateStatusText = "遅刻";
        const lateOption = screen.getByText(lateStatusText);
        userEvent.click(lateOption);

        await checkAutocompletePopper(wrapper, false);

        expect(autocompleteInput).toHaveValue(lateStatusText);
    });
});
