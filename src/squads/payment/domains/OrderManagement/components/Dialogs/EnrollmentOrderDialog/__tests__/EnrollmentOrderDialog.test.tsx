import { UseFormProps } from "react-hook-form";
import { KeyCountries, UserRoles } from "src/common/constants/const";
import {
    KeyProductFeeTypes,
    KeyProductTypes,
    KeyStudentEnrollmentStatusTypes,
    KeyTaxCategoryTypes,
} from "src/squads/payment/constants/const";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { Payment_GetManyProductsByProductIdsAndAvailableDateQuery } from "src/squads/payment/service/fatima/fatima-types";
import { CreateOrder } from "src/squads/payment/service/payment/order-payment-service/types";
import {
    changeAutocompleteInput,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import EnrollmentOrderDialog, {
    EnrollmentOrderDialogProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentOrderDialog";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import { transformDataToCreateOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useEnrollmentProducts from "src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProducts";
import useOrderMutation, {
    UseOrderMutationProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useOrderMutation";
import ProductExtensionPluginsProvider, {
    useProductPluginsContext,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const { currentCurrency } = getCurrentCurrency();
const noInformationSections = ["Billed At Order Section", "Upcoming Billing Section"];
const defaultEnrollmentOrderDialogProps: EnrollmentOrderDialogProps = {
    isOpen: true,
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
const mockLocation: NsBobLocationService.RetrieveLocationsResponseLocation = {
    locationId: "1",
    name: "HCM",
};
const defaultEnrollmentOrderDialogFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: mockStudentInfo,
                productFieldArrayItems: [],
            },
        ],
        location: mockLocation,
    },
};

const enrollmentProduct = {
    product_id: "product_id_1",
    name: "Enrollment Product Testing",
    product_type: KeyProductTypes.PRODUCT_TYPE_FEE,
    tax_id: "tax_id_1",
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    remarks: "Remark 1",
    billing_schedule_id: "billing_schedule_id_1",
    disable_pro_rating_flag: false,
    updated_at: "2021-12-28T02:35:17.738675+00:00",
    created_at: "2021-12-28T02:35:17.738675+00:00",
};
const mockProductTax = {
    tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
    tax_percentage: 10,
};
const mockProductPrices = [
    {
        billing_schedule_period_id: "billing_schedule_period_id_1",
        created_at: "2021-12-28T02:35:18.03406+00:00",
        product_price_id: 2,
        price: 1000,
        product_id: "product_id_1",
        quantity: 10,
    },
];
const mockProductEntity = {
    fee_type: KeyProductFeeTypes.FEE_TYPE_ONE_TIME,
};
const enrollmentProductFormValues = [
    {
        product: enrollmentProduct,
        fee: mockProductEntity,
        productTax: mockProductTax,
        productPrices: mockProductPrices,
    },
];
const enrollmentOrderFormSubmitValues: OrderFormValues = {
    students: [
        {
            studentInfo: mockStudentInfo,
            productFieldArrayItems: enrollmentProductFormValues,
            comment: "",
        },
    ],
    location: mockLocation,
};

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProducts", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockProduct: ArrayElement<
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"]
> = {
    product_id: "product_id_1",
    name: "Product package",
    product_type: KeyProductTypes.PRODUCT_TYPE_PACKAGE,
    tax_id: "tax_id_1",
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    remarks: "Remark 1",
    billing_schedule_id: "billing_schedule_id_1",
    disable_pro_rating_flag: false,
    updated_at: "2021-12-28T02:35:17.738675+00:00",
    created_at: "2021-12-28T02:35:17.738675+00:00",
};
jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended/useProductAutocomplete",
    () => {
        return {
            __esModule: true,
            default: (): MAutocompleteServiceHookReturn<ProductTypeQuery> => ({
                data: [mockProduct],
                isFetching: false,
            }),
        };
    }
);

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete"
);

jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations",
    () => {
        return {
            __esModule: true,
            default:
                (): MAutocompleteServiceHookReturn<NsBobLocationService.RetrieveLocationsResponseLocation> => ({
                    data: [mockLocation],
                    isFetching: false,
                }),
        };
    }
);

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation",
    () => {
        return {
            __esModule: true,
            default: () => ({
                productIds: ["product_id_1", "product_id_2"],
            }),
        };
    }
);

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useOrderMutation/useOrderMutation",
    () => {
        return {
            __esModule: true,
            default: jest.fn(),
        };
    }
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockProductEntity,
            isFetching: false,
        }),
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockProductTax,
            isFetching: false,
        }),
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockProductPrices,
            isFetching: false,
        }),
    };
});

const renderEnrollmentOrderDialog = (
    enrollmentOrderProps: EnrollmentOrderDialogProps = defaultEnrollmentOrderDialogProps,
    useFormOptions: UseFormProps<OrderFormValues> = defaultEnrollmentOrderDialogFormOptions
) => {
    return render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <ProductExtensionPluginsProvider
                        currency={currentCurrency}
                        orderType={OrderType.ORDER_TYPE_ENROLLMENT}
                        notImplementedYetPlugins={defaultNotImplementedYetPlugins}
                    >
                        <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                            <TestThemeProvider>
                                <EnrollmentOrderDialog {...enrollmentOrderProps} />
                            </TestThemeProvider>
                        </TestHookFormProvider>
                    </ProductExtensionPluginsProvider>
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
};

const mockOnCreateOrder = jest.fn();
let isMutateLoading = false;
let isEnrollmentFetched = false;

const mockUseEnrollmentProducts = () => {
    isEnrollmentFetched = false;
    (useEnrollmentProducts as jest.Mock).mockImplementation(({ onFinishFetchingData }) => {
        if (isEnrollmentFetched) return;
        onFinishFetchingData?.(enrollmentProductFormValues);
        isEnrollmentFetched = true;
    });
};

describe("<EnrollmentOrderDialog />", () => {
    beforeEach(() => {
        mockUseEnrollmentProducts();
        (useOrderMutation as jest.Mock).mockImplementation(() => {
            isMutateLoading = true;
            return {
                onCreate: (data: CreateOrder) => {
                    mockOnCreateOrder(data);
                    isMutateLoading = false;
                },
            };
        });
    });
    it("should render default location for order dialog", () => {
        renderEnrollmentOrderDialog();

        const { autocompleteInput: locationAutoComplete } = getAutocompleteInputByTestId(
            "LocationsLowestLevelAutocompleteHF__autocomplete"
        );

        const expectedValues = {
            defaultLocation: "HCM",
        };

        expect(locationAutoComplete).toHaveValue(expectedValues.defaultLocation);
    });

    it("should render enrollment order dialog with enrollment product", () => {
        const wrapper = renderEnrollmentOrderDialog();

        expect(wrapper.getByTestId("EnrollmentOrderDialog__dialog")).toBeInTheDocument();
        expect(wrapper.getByText(enrollmentProduct.name)).toBeInTheDocument();
    });

    it("should reset product array items when location is change", () => {
        const wrapper = renderEnrollmentOrderDialog();

        getAutocompleteInputByTestId("LocationsLowestLevelAutocompleteHF__autocomplete");

        changeAutocompleteInput("LocationsLowestLevelAutocompleteHF__autocomplete", "HN", 1);

        expect(wrapper.getAllByText("No Information")).toHaveLength(noInformationSections.length);
    });

    it("should call open dialog cancel confirm when clicking close button and cancel button", () => {
        const wrapper = renderEnrollmentOrderDialog();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));

        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonCancel"));

        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
    });

    it("should close dialog cancel confirm when user clicks cancel", async () => {
        const wrapper = renderEnrollmentOrderDialog();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonClose"));
        await waitFor(() =>
            expect(wrapper.queryByTestId("DialogCancelConfirm__dialog")).not.toBeInTheDocument()
        );
    });

    it("should call create order with transformed data on submit", async () => {
        const wrapper = renderEnrollmentOrderDialog(
            defaultEnrollmentOrderDialogProps,
            defaultEnrollmentOrderDialogFormOptions
        );

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

        const {
            result: {
                current: { getProductPluginsMap },
            },
        } = renderHook(() => useProductPluginsContext(), {
            wrapper: ProductExtensionPluginsProvider,
        });

        const transformedData = transformDataToCreateOrder(
            enrollmentOrderFormSubmitValues,
            OrderType.ORDER_TYPE_ENROLLMENT,
            getProductPluginsMap,
            "single-student-order"
        );

        await waitFor(() => expect(isMutateLoading).toEqual(false));

        expect(mockOnCreateOrder).toBeCalledWith({ data: transformedData });
    });

    it("should not reset product list when submit has no mismatch error", async () => {
        const mockError = "CREATE ERROR";
        (useOrderMutation as jest.Mock).mockImplementation(
            ({ onCreateError }: UseOrderMutationProps) => {
                isMutateLoading = true;
                return {
                    onCreate: (data: CreateOrder) => {
                        isMutateLoading = false;
                        mockOnCreateOrder(data);
                        onCreateError(mockError);
                    },
                };
            }
        );

        const wrapper = renderEnrollmentOrderDialog(
            defaultEnrollmentOrderDialogProps,
            defaultEnrollmentOrderDialogFormOptions
        );

        const {
            result: {
                current: { getProductPluginsMap },
            },
        } = renderHook(() => useProductPluginsContext(), {
            wrapper: ProductExtensionPluginsProvider,
        });

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

        const transformedData = transformDataToCreateOrder(
            enrollmentOrderFormSubmitValues,
            OrderType.ORDER_TYPE_ENROLLMENT,
            getProductPluginsMap,
            "single-student-order"
        );

        await waitFor(() => expect(isMutateLoading).toEqual(false));

        expect(mockOnCreateOrder).toBeCalledWith({ data: transformedData });
        expect(
            wrapper.queryByTestId("BilledAtOrderSection__noDataContainer")
        ).not.toBeInTheDocument();
    });

    it("should reset product list when submit has mismatch error", async () => {
        const mockMismatchError = "ra.manabie-error.specified.orderMismatch";
        (useOrderMutation as jest.Mock).mockImplementation(
            ({ onCreateError }: UseOrderMutationProps) => {
                isMutateLoading = true;
                return {
                    onCreate: (data: CreateOrder) => {
                        mockOnCreateOrder(data);
                        onCreateError(mockMismatchError);
                        isMutateLoading = false;
                    },
                };
            }
        );

        const wrapper = renderEnrollmentOrderDialog(
            defaultEnrollmentOrderDialogProps,
            defaultEnrollmentOrderDialogFormOptions
        );

        const {
            result: {
                current: { getProductPluginsMap },
            },
        } = renderHook(() => useProductPluginsContext(), {
            wrapper: ProductExtensionPluginsProvider,
        });

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

        const transformedData = transformDataToCreateOrder(
            enrollmentOrderFormSubmitValues,
            OrderType.ORDER_TYPE_ENROLLMENT,
            getProductPluginsMap,
            "single-student-order"
        );

        await waitFor(() => expect(isMutateLoading).toEqual(false));

        expect(mockOnCreateOrder).toBeCalledWith({ data: transformedData });
        expect(wrapper.getByTestId("BilledAtOrderSection__noDataContainer")).toBeInTheDocument();
    });
});
