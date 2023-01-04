import { UseFormProps } from "react-hook-form";
import { KeyCountries, UserRoles } from "src/common/constants/const";
import {
    KeyDiscountAmountTypes,
    KeyDiscountTypes,
    KeyProductPackageTypes,
    KeyProductTypes,
    KeyStudentEnrollmentStatusTypes,
    KeyTaxCategoryTypes,
} from "src/squads/payment/constants/const";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import {
    Payment_GetManyCourseByCourseIdsQuery,
    Payment_GetManyDiscountsQuery,
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery,
    Payment_GetProductPriceByProductIdQuery,
    Payment_GetTaxByTaxIdV2Query,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    changeAutocompleteInput,
    checkErrorMessage,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { OrderDetailProductListDiscountType } from "src/squads/payment/types/service/discount-types";
import { ProductPackageType } from "src/squads/payment/types/service/product-package-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import NewOrderDialog, {
    NewOrderDialogProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/NewOrderDialog";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import useSubmitOrder, {
    UseSubmitOrderProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockCreateOrder = jest.fn();

const { currentCurrency } = getCurrentCurrency();
const noInformationSections = [
    "Product List Section",
    "Billed At Order Section",
    "Upcoming Billing Section",
];

const mockLocation: ArrayElement<NsBobLocationService.RetrieveLocationsResponseLocation[]> = {
    locationId: "1",
    name: "HCM",
};
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

const mockProductChoices: Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"] = [
    {
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
    },
    {
        product_id: "product_id_2",
        name: "Product material",
        product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
        tax_id: "tax_id_2",
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        remarks: "Remark 2",
        billing_schedule_id: "billing_schedule_id_2",
        disable_pro_rating_flag: false,
        updated_at: "2021-12-28T02:35:17.738675+00:00",
        created_at: "2021-12-28T02:35:17.738675+00:00",
    },
];
jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended/useProductAutocomplete",
    () => {
        return {
            __esModule: true,
            default: (): MAutocompleteServiceHookReturn<ProductTypeQuery> => ({
                data: mockProductChoices,
                isFetching: false,
            }),
        };
    }
);

const mockDiscount: ArrayElement<OrderDetailProductListDiscountType[]> = {
    discount_id: "discount_id_1",
    name: "Discount 1",
    available_from: "2021-12-28T02:35:17.676837+00:00",
    available_until: "2022-12-28T02:35:17.676837+00:00",
    created_at: "2021-12-28T02:35:17.677491+00:00",
    discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
    discount_amount_value: 10,
    discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
    recurring_valid_duration: null,
    remarks: "Remarks 1",
    updated_at: "2021-12-28T02:35:17.677491+00:00",
};
jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete",
    () =>
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyDiscountsQuery["discount"]>
        > => ({
            data: [mockDiscount],
            isFetching: false,
        })
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

const mockPackageEntity: ProductPackageType = {
    max_slot: 34,
    package_type: KeyProductPackageTypes.PACKAGE_TYPE_SLOT_BASED,
    package_start_date: "2021-12-28T02:35:17.73456+00:00",
    package_end_date: "2022-12-28T02:35:17.73456+00:00",
};
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                data: mockPackageEntity,
                isFetching: false,
            };
        },
    };
});

const mockProductTax: ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]> = {
    tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
    tax_percentage: 10,
};
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                data: [mockProductTax],
                isFetching: false,
            };
        },
    };
});

const mockProductPrices: Payment_GetProductPriceByProductIdQuery["product_price"] = [
    {
        billing_schedule_period_id: "billing_schedule_period_id_1",
        created_at: "2021-12-28T02:35:18.03406+00:00",
        product_price_id: 2,
        price: 1000,
        product_id: "product_id_1",
        quantity: 10,
    },
];
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                data: mockProductPrices,
                isFetching: false,
            };
        },
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods");

const mockCourseList: Payment_GetManyCourseByCourseIdsQuery["courses"] = [
    {
        course_id: "course_id_1",
        name: "Course name 1",
        grade: 1,
    },
    {
        course_id: "course_id_2",
        name: "Course name 2",
        grade: 1,
    },
    {
        course_id: "course_id_3",
        name: "Course name 3",
        grade: 1,
    },
    {
        course_id: "course_id_4",
        name: "Course name 4",
        grade: 1,
    },
];
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useCourses", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                data: mockCourseList,
                isFetching: false,
            };
        },
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/usePackageCourses", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                data: [],
                isFetching: false,
            };
        },
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const defaultNewOrderDialogProps: NewOrderDialogProps = {
    isOpen: true,
    onClose: jest.fn(),
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
const mockPackageCourses = [
    {
        packageCourse: {
            course_id: "course_id_1",
            course_weight: 1,
            created_at: "2021-12-28T02:35:17.738675+00:00",
            mandatory_flag: true,
            max_slots_per_course: 5,
            package_id: "package_id_1",
        },
        course: {
            course_id: "course_id_1",
            name: "Course name 1",
            grade: 1,
        },
        slot: 1,
    },
];
const newOrderDialogOrderFormValuesWithProduct: OrderFormValues = {
    students: [
        {
            studentInfo: mockStudentInfo,
            productFieldArrayItems: [
                {
                    product: mockProductChoices[0],
                    packageEntity: mockPackageEntity,
                    productPrices: mockProductPrices,
                    productTax: mockProductTax,
                    discount: mockDiscount,
                    packageCourses: mockPackageCourses,
                    associatedProducts: [],
                },
            ],
            comment: "test comment",
        },
    ],
    location: mockLocation,
};
const newOrderDialogSubmitFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: newOrderDialogOrderFormValuesWithProduct,
};

const defaultNewOrderDialogFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                productFieldArrayItems: [{ product: null }],
            },
        ],
        location: mockLocation,
    },
};

const renderNewOrderDialogWithTestHookForm = (
    newOrderDialogProps: NewOrderDialogProps = defaultNewOrderDialogProps,
    useFormOptions: UseFormProps<OrderFormValues> = defaultNewOrderDialogFormOptions
) => {
    return render(
        <ProductExtensionPluginsProvider
            currency={currentCurrency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <TestApp>
                <MuiPickersUtilsProvider>
                    <TestQueryWrapper>
                        <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                            <TestThemeProvider>
                                <NewOrderDialog {...newOrderDialogProps} />
                            </TestThemeProvider>
                        </TestHookFormProvider>
                    </TestQueryWrapper>
                </MuiPickersUtilsProvider>
            </TestApp>
        </ProductExtensionPluginsProvider>
    );
};

const mockUseSubmitOrder = (errorMessage?: string) => {
    (useSubmitOrder as jest.Mock).mockImplementation(({ onCreateError }: UseSubmitOrderProps) => {
        return {
            createOrder: async (data: OrderFormValues) => {
                await mockCreateOrder(data);
                if (errorMessage) {
                    onCreateError(errorMessage);
                }
            },
            isOnCreateLoading: false,
        };
    });
};

describe("<NewOrderDialog />", () => {
    beforeEach(() => {
        mockUseSubmitOrder();
    });

    it("should render new order dialog with location and product item", () => {
        const wrapper = renderNewOrderDialogWithTestHookForm();

        expect(wrapper.getByTestId("NewOrderDialog__dialog")).toBeInTheDocument();

        const productRow = wrapper.getAllByTestId("TableBase__row");
        expect(productRow).toHaveLength(1);

        const { autocompleteInput: productAutoComplete } = getAutocompleteInputByTestId(
            "ProductAutocompleteWithIdsHF__autocomplete"
        );

        const { autocompleteInput: locationAutoComplete } = getAutocompleteInputByTestId(
            "LocationsLowestLevelAutocompleteHF__autocomplete"
        );

        const expectedValues = {
            defaultProduct: "",
            defaultLocation: "HCM",
        };

        expect(productAutoComplete).toHaveValue(expectedValues.defaultProduct);
        expect(locationAutoComplete).toHaveValue(expectedValues.defaultLocation);
    });

    it("should reset product array items when location is change", () => {
        renderNewOrderDialogWithTestHookForm();

        getAutocompleteInputByTestId("LocationsLowestLevelAutocompleteHF__autocomplete");

        changeAutocompleteInput("LocationsLowestLevelAutocompleteHF__autocomplete", "HN", 1);

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "ProductAutocompleteWithIdsHF__autocomplete"
        );
        expect(autocompleteInput).toHaveValue("");
    });

    it("should change product when new product is selected", () => {
        renderNewOrderDialogWithTestHookForm();

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "ProductAutocompleteWithIdsHF__autocomplete"
        );

        // +1 because changeAutocomplete counts arrow down input
        const choiceIndex =
            mockProductChoices.findIndex(({ name }) => name === "Product material") + 1;
        changeAutocompleteInput(
            "ProductAutocompleteWithIdsHF__autocomplete",
            "Product material",
            choiceIndex
        );

        expect(autocompleteInput).toHaveValue("Product material");
    });

    it("should remove array field item when user clicks delete", () => {
        const wrapper = renderNewOrderDialogWithTestHookForm();

        const productItemOptionButton = wrapper.getByTestId("MenuItemPanel__trigger");
        userEvent.click(productItemOptionButton);

        const deleteItemButton = screen.getByText("Delete");
        userEvent.click(deleteItemButton);

        expect(wrapper.getAllByText("No Information")).toHaveLength(noInformationSections.length);
    });

    it("should call open dialog cancel confirm when clicking close button and cancel button", () => {
        const wrapper = renderNewOrderDialogWithTestHookForm();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));

        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonCancel"));

        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
    });

    it("should call onClose when user clicks leave in dialog cancel confirm", () => {
        const wrapper = renderNewOrderDialogWithTestHookForm();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));
        expect(defaultNewOrderDialogProps.onClose).toBeCalledTimes(1);
    });

    it("should close dialog cancel confirm when user clicks cancel", async () => {
        const wrapper = renderNewOrderDialogWithTestHookForm();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonClose"));
        await waitFor(() =>
            expect(wrapper.queryByTestId("DialogCancelConfirm__dialog")).not.toBeInTheDocument()
        );
    });

    it("should show table error message when submitting array with empty product", async () => {
        const wrapper = renderNewOrderDialogWithTestHookForm();

        expect(
            wrapper.getByTestId("ProductAutocompleteWithIdsHF__autocomplete")
        ).toBeInTheDocument();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

        await checkErrorMessage(1, "This field is required");
    });

    it("should call create order when click submit", async () => {
        const wrapper = renderNewOrderDialogWithTestHookForm(
            defaultNewOrderDialogProps,
            newOrderDialogSubmitFormOptions
        );

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

        await waitFor(() => {
            expect(mockCreateOrder).toBeCalledWith(newOrderDialogOrderFormValuesWithProduct);
        });
    });

    it("should not reset product list when submit has no mismatch error", async () => {
        const mockError = "CREATE ERROR";
        mockUseSubmitOrder(mockError);

        const wrapper = renderNewOrderDialogWithTestHookForm(
            defaultNewOrderDialogProps,
            newOrderDialogSubmitFormOptions
        );

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

        await waitFor(() => {
            expect(mockCreateOrder).toBeCalledWith(newOrderDialogOrderFormValuesWithProduct);
        });
        expect(wrapper.queryByTestId("TableBase__noDataMessage")).not.toBeInTheDocument();
    });

    it("should reset product list when submit has mismatch error", async () => {
        const mockMismatchError = "ra.manabie-error.specified.orderMismatch";
        mockUseSubmitOrder(mockMismatchError);

        const wrapper = renderNewOrderDialogWithTestHookForm(
            defaultNewOrderDialogProps,
            newOrderDialogSubmitFormOptions
        );

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

        await waitFor(() => {
            expect(mockCreateOrder).toBeCalledWith(newOrderDialogOrderFormValuesWithProduct);
        });

        expect(wrapper.getByTestId("BilledAtOrderSection__noDataContainer")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingSection__noDataContainer")).toBeInTheDocument();
    });
});
