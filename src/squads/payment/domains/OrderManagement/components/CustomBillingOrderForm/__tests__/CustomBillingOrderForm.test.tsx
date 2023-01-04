import { UseFormProps } from "react-hook-form";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import {
    changeAutocompleteInput,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import CustomBillingOrderForm, {
    CustomBillingOrderFormProps,
} from "src/squads/payment/domains/OrderManagement/components/CustomBillingOrderForm/CustomBillingOrderForm";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockStudentInfo = createMockStudentInfo();
const mockCenterChoices = createMockCenterChoices();

const errorMessage: string = "billingErrorMessage";

jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations",
    () => {
        return {
            __esModule: true,
            default:
                (): MAutocompleteServiceHookReturn<NsBobLocationService.RetrieveLocationsResponseLocation> => ({
                    data: mockCenterChoices,
                    isFetching: false,
                }),
        };
    }
);

const defaultCustomBillingOrderFormProps: CustomBillingOrderFormProps = {
    onLocationChange: jest.fn(),
    billingErrorMessage: errorMessage,
};

const defaultCustomBillingOrderFormOptions: UseFormProps<CustomBillingOrderFormValue> = {
    defaultValues: {
        student: mockStudentInfo,
        billingFieldArrayItem: [],
        location: mockCenterChoices[0],
    },
};

const renderCustomBillingOrderForm = (
    customBillingOrderFormProps: CustomBillingOrderFormProps = defaultCustomBillingOrderFormProps,
    useFormOptions: UseFormProps<CustomBillingOrderFormValue> = defaultCustomBillingOrderFormOptions
) => {
    return render(
        <TestApp>
            <TestHookFormProvider<CustomBillingOrderFormValue> useFormOptions={useFormOptions}>
                <TestQueryWrapper>
                    <CustomBillingOrderForm {...customBillingOrderFormProps} />
                </TestQueryWrapper>
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<CustomBillingOrderForm />", () => {
    it("should render correctly custom billing order form components", () => {
        const { getByTestId } = renderCustomBillingOrderForm();

        expect(getByTestId("CustomBillingOrderForm__container")).toBeInTheDocument();
        expect(
            getByTestId("CustomBillingStudentInfoSection__studentNameTitle")
        ).toBeInTheDocument();
        expect(
            getByTestId("CustomBillingStudentInfoSection__studentNameContainer")
        ).toBeInTheDocument();
        expect(getByTestId("CustomBillingOrderTable__root")).toBeInTheDocument();
        expect(getByTestId("CustomBillingCommentSection__commentInput")).toBeInTheDocument();
    });

    it("should display first location is selected as default", () => {
        renderCustomBillingOrderForm();
        const { autocompleteInput } = getAutocompleteInputByTestId(
            "LocationsLowestLevelAutocompleteHF__autocomplete"
        );

        expect(autocompleteInput).toBeInTheDocument();

        expect(autocompleteInput).toHaveValue(mockCenterChoices[0].name);
    });
    it("should call onLocationChange function when location field is updated", () => {
        renderCustomBillingOrderForm();

        changeAutocompleteInput(
            "LocationsLowestLevelAutocompleteHF__autocomplete",
            mockCenterChoices[1].name,
            1
        );

        expect(defaultCustomBillingOrderFormProps.onLocationChange).toBeCalled();
    });

    it("should not be able to remove default location without choosing another location in location autocomplete", () => {
        renderCustomBillingOrderForm();
        const { autocompleteInput } = getAutocompleteInputByTestId(
            "LocationsLowestLevelAutocompleteHF__autocomplete"
        );

        userEvent.click(autocompleteInput);
        userEvent.type(autocompleteInput, "{del}");
        userEvent.click(document.body);

        expect(autocompleteInput).toHaveValue(mockCenterChoices[0].name);
    });
});
