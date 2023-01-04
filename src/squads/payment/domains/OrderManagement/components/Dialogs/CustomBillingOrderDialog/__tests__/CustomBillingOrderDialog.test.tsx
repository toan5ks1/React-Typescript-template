import { UseFormProps } from "react-hook-form";
import { KeyCountries, UserRoles } from "src/common/constants/const";
import {
    KeyTaxCategoryTypes,
    KeyStudentEnrollmentStatusTypes,
} from "src/squads/payment/constants/const";
import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { Payment_GetManyTaxesReferenceQuery } from "src/squads/payment/service/fatima/fatima-types";
import { CustomBillingOrderRequest } from "src/squads/payment/service/payment/order-payment-service/types";
import { createMockCustomBillingOrderFormValue } from "src/squads/payment/test-utils/mocks/order-form-custom-billing";
import {
    changeAutocompleteInput,
    checkErrorMessage,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import CustomBillingOrderDialog, {
    CustomBillingOrderDialogProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/CustomBillingOrderDialog/CustomBillingOrderDialog";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { transformDataToCreateCustomBillingOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useCustomBillingOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useCustomBillingOrderMutation";
import useGoBackToRedirectUrl from "src/squads/payment/hooks/useGoBackToRedirectUrl";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const goBackToRedirectUrl = jest.fn();
const mockOnCreateCustomBillingOrder = jest.fn();
let isOnCreateCustomBillingOrderLoading: boolean = false;
const errorMessage: string = "This section is required";
const requiredFieldErrorMessage: string = "Required fields cannot be blank!";
const incorrectFormatFieldErrorMessage: string = "Format of the field is not correct";

jest.mock("src/squads/payment/hooks/useGoBackToRedirectUrl", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockLocationChoices: NsBobLocationService.RetrieveLocationsResponseLocation[] = [
    {
        locationId: "1",
        name: "HCM",
    },
    {
        locationId: "2",
        name: "HN",
    },
];
jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations",
    () => {
        return {
            __esModule: true,
            default:
                (): MAutocompleteServiceHookReturn<NsBobLocationService.RetrieveLocationsResponseLocation> => ({
                    data: mockLocationChoices,
                    isFetching: false,
                }),
        };
    }
);

const mockTaxChoices: Payment_GetManyTaxesReferenceQuery["tax"] = [
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_1",
        name: "Tax 1",
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_2",
        name: "Tax 2",
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_3",
        name: "Tax 3",
    },
];
jest.mock(
    "src/squads/payment/components/Autocompletes/TaxAutocompleteHF/useTaxAutocomplete",
    () =>
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>
        > => ({
            data: mockTaxChoices,
            isFetching: false,
        })
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useCustomBillingOrderMutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const defaultCustomBillingOrderDialogProps: CustomBillingOrderDialogProps = {
    isOpen: true,
    onClose: goBackToRedirectUrl,
};

const mockStudentInfo: ArrayElement<Payment_GetStudentsManyV3Query["students"]> = {
    enrollment_status: KeyStudentEnrollmentStatusTypes.STUDENT_ENROLLMENT_STATUS_ENROLLED,
    student_id: `student_id_1`,
    student_note: "student note",
    current_grade: 1,
    user: {
        country: KeyCountries.COUNTRY_VN,
        email: "test-email@test.com",
        last_name: "test",
        first_name: "name",
        user_group: UserRoles.USER_GROUP_STUDENT,
        user_id: `student_id_1`,
    },
};
const defaultCustomBillingOrderDialogFormOptions: UseFormProps<CustomBillingOrderFormValue> = {
    defaultValues: {
        student: mockStudentInfo,
        billingFieldArrayItem: [],
        location: mockLocationChoices[0],
    },
};

const handleChangeLocationAutoComplete = () => {
    const { autocompleteInput } = getAutocompleteInputByTestId(
        "LocationsLowestLevelAutocompleteHF__autocomplete"
    );
    expect(autocompleteInput).toBeInTheDocument();

    changeAutocompleteInput("LocationsLowestLevelAutocompleteHF__autocomplete", "HN");

    return autocompleteInput;
};

const handleSubmitCustomBillingOrder = (
    data: CustomBillingOrderFormValue
): CustomBillingOrderRequest => {
    const { getByTestId } = renderCustomBillingOrderDialog(defaultCustomBillingOrderDialogProps, {
        defaultValues: data,
    });

    userEvent.click(getByTestId("OrderDialogFooter__buttonSubmit"));

    const transformedData = transformDataToCreateCustomBillingOrder(
        data,
        OrderType.ORDER_TYPE_CUSTOM_BILLING
    );

    return transformedData;
};

const renderCustomBillingOrderDialog = (
    customBillingOrderDialogProps: CustomBillingOrderDialogProps = defaultCustomBillingOrderDialogProps,
    useFormOptions: UseFormProps<CustomBillingOrderFormValue> = defaultCustomBillingOrderDialogFormOptions
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider<CustomBillingOrderFormValue> useFormOptions={useFormOptions}>
                    <CustomBillingOrderDialog {...customBillingOrderDialogProps} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<CustomBillingOrderDialog />", () => {
    beforeEach(() => {
        (useGoBackToRedirectUrl as jest.Mock).mockImplementation(() => goBackToRedirectUrl);
        (useCustomBillingOrderMutation as jest.Mock).mockImplementation(() => {
            isOnCreateCustomBillingOrderLoading = true;
            return {
                onCreateCustomBillingOrder: (data: CustomBillingOrderRequest) => {
                    mockOnCreateCustomBillingOrder(data);
                    isOnCreateCustomBillingOrderLoading = false;
                },
            };
        });
    });

    it("should render default location for order dialog", () => {
        renderCustomBillingOrderDialog();

        const { autocompleteInput: locationAutoComplete } = getAutocompleteInputByTestId(
            "LocationsLowestLevelAutocompleteHF__autocomplete"
        );

        const expectedValues = {
            defaultLocation: "HCM",
        };

        expect(locationAutoComplete).toHaveValue(expectedValues.defaultLocation);
    });

    it("should call goBackToRedirectUrl when click close button", () => {
        const { getByTestId, getByText } = renderCustomBillingOrderDialog();

        userEvent.click(getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(getByText("Leave"));

        expect(goBackToRedirectUrl).toBeCalledTimes(1);
    });

    it("should stay in create custom billing order dialog when user discard the “Close” process", () => {
        const { getByTestId } = renderCustomBillingOrderDialog();

        userEvent.click(getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(getByTestId("FooterDialogConfirm__buttonClose"));

        expect(getByTestId("CustomBillingOrderDialogContainer__dialog")).toBeInTheDocument();
    });

    it("should call goBackToRedirectUrl when click cancel button", () => {
        const { getByTestId, getByText } = renderCustomBillingOrderDialog();

        userEvent.click(getByTestId("OrderDialogFooter__buttonCancel"));
        userEvent.click(getByText("Leave"));

        expect(goBackToRedirectUrl).toBeCalledTimes(1);
    });

    it("should stay in create custom billing order dialog when user discard the “Cancel” process", () => {
        const { getByTestId } = renderCustomBillingOrderDialog();

        userEvent.click(getByTestId("OrderDialogFooter__buttonCancel"));
        userEvent.click(getByTestId("FooterDialogConfirm__buttonClose"));

        expect(getByTestId("CustomBillingOrderDialogContainer__dialog")).toBeInTheDocument();
    });

    it("should change location value when new location is selected", () => {
        renderCustomBillingOrderDialog();

        const locationAutoCompleteInputValue = handleChangeLocationAutoComplete();

        const expectedValues = {
            newLocation: "HN",
        };

        expect(locationAutoCompleteInputValue).toHaveValue(expectedValues.newLocation);
    });

    it("should reset billingFieldArrayItem when location is change", () => {
        const wrapper = renderCustomBillingOrderDialog();

        const addButton = wrapper.getByTestId("CustomBillingSection__addButton");
        userEvent.click(addButton);

        expect(wrapper.queryByTestId("NoData__message")).not.toBeInTheDocument();

        handleChangeLocationAutoComplete();

        expect(wrapper.getByTestId("NoData__icon")).toBeInTheDocument();
        expect(wrapper.getByTestId("NoData__message")).toBeInTheDocument();
    });

    it("should show table error message when submitting without billing items", async () => {
        const { getByTestId } = renderCustomBillingOrderDialog();

        userEvent.click(getByTestId("OrderDialogFooter__buttonSubmit"));

        await checkErrorMessage(1, errorMessage);
    });

    it("should show correctly error message when submitting with empty required field", async () => {
        const { getByTestId } = renderCustomBillingOrderDialog();

        const addButton = getByTestId("CustomBillingSection__addButton");
        userEvent.click(addButton);

        userEvent.click(getByTestId("OrderDialogFooter__buttonSubmit"));

        await checkErrorMessage(1, requiredFieldErrorMessage);
    });

    it("should show correctly error message when submitting with incorrect format price field", async () => {
        const { getByTestId } = renderCustomBillingOrderDialog();

        const incorrectPriceValue = "1000-20";

        const addButton = getByTestId("CustomBillingSection__addButton");
        userEvent.click(addButton);

        const priceField = getByTestId("CustomBillingOrderTable__priceField") as HTMLInputElement;
        userEvent.type(priceField, incorrectPriceValue);

        userEvent.click(getByTestId("OrderDialogFooter__buttonSubmit"));

        await checkErrorMessage(1, incorrectFormatFieldErrorMessage);
    });

    //TODO fix timeout issue for this test
    it.skip("should remove error message when new location is selected", async () => {
        const { getByTestId } = renderCustomBillingOrderDialog();

        userEvent.click(getByTestId("OrderDialogFooter__buttonSubmit"));

        await checkErrorMessage(1, errorMessage);

        handleChangeLocationAutoComplete();

        await checkErrorMessage(0, errorMessage);
    });

    it("should submit successfully with required field only", async () => {
        const requiredFieldCustomBillingFormValue = createMockCustomBillingOrderFormValue();

        const transformedData = handleSubmitCustomBillingOrder(requiredFieldCustomBillingFormValue);

        await waitFor(() => expect(isOnCreateCustomBillingOrderLoading).toEqual(false));

        expect(mockOnCreateCustomBillingOrder).toBeCalledWith({ data: transformedData });
    });

    it("should submit successfully with all fields", async () => {
        const allFieldCustomBillingFormValue = createMockCustomBillingOrderFormValue(
            mockTaxChoices[0]
        );

        const transformedData = handleSubmitCustomBillingOrder(allFieldCustomBillingFormValue);

        await waitFor(() => expect(isOnCreateCustomBillingOrderLoading).toEqual(false));

        expect(mockOnCreateCustomBillingOrder).toBeCalledWith({ data: transformedData });
    });
});
