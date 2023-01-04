import { KeyProductMaterialTypes } from "src/squads/payment/constants/const";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import {
    createMockCourseList,
    createMockPackageCourseList,
    createMockPackageCourses,
} from "src/squads/payment/test-utils/mocks/package-course";
import {
    createMockProductChoices,
    createMockProductFeeList,
    createMockProductMaterialList,
    createMockProductPackageList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { createMockTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import {
    OrderFormValues,
    ProductFormPackageCourseType,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";

export const createMockOrderFormValues = (
    productFieldArrayItems: OrderFormValues["students"][0]["productFieldArrayItems"] = [
        {
            product: createMockProductChoices()[0],
            packageEntity: createMockProductPackageList()[0],
        },
        {
            product: createMockProductChoices()[1],
            material: createMockProductMaterialList()[0],
        },
        {
            product: createMockProductChoices()[1],
            material: {
                custom_billing_date: null,
                material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
            },
        },
        {
            product: createMockProductChoices()[1],
            material: undefined,
        },
        {
            product: createMockProductChoices()[2],
            fee: createMockProductFeeList()[0],
        },
        {
            product: createMockProductChoices()[1],
            material: {
                material_type: KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING,
            },
        },
    ]
): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: createMockStudentInfo(),
                productFieldArrayItems: productFieldArrayItems,
                comment: "test comment",
            },
        ],
        location: createMockCenterChoices()[0],
    };
};

export const createMockCompleteOrderFormValues = (
    productFieldArrayItems: OrderFormValues["students"][0]["productFieldArrayItems"] = [
        {
            product: createMockProductChoices()[0],
            packageEntity: createMockProductPackageList()[0],
            productPrices: createMockProductPriceList(),
            productTax: createMockTaxDataList()[0],
            discount: createMockDiscountChoices()[0],
            packageCourses: undefined,
            associatedProducts: undefined,
        },
        {
            product: createMockProductChoices()[1],
            material: createMockProductMaterialList()[0],
            productPrices: createMockProductPriceList(),
            productTax: createMockTaxDataList()[0],
            discount: createMockDiscountChoices()[0],
        },
        {
            product: createMockProductChoices()[1],
            material: createMockProductMaterialList()[0],
            productPrices: createMockProductPriceList(),
            productTax: createMockTaxDataList()[1],
            discount: createMockDiscountChoices()[0],
        },
        {
            product: createMockProductChoices()[1],
            material: createMockProductMaterialList()[1],
            productPrices: createMockProductPriceList(),
            productTax: createMockTaxDataList()[1],
            discount: createMockDiscountChoices()[0],
        },
        {
            product: createMockProductChoices()[2],
            fee: createMockProductFeeList()[0],
            productPrices: createMockProductPriceList(),
            productTax: createMockTaxDataList()[0],
            discount: createMockDiscountChoices()[0],
        },
    ]
): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: createMockStudentInfo(),
                productFieldArrayItems: productFieldArrayItems,
                comment: "test comment",
            },
        ],
        location: createMockCenterChoices()[0],
    };
};

export const createMockOrderFormValueWithPackageCourses = (
    packageCourses: ProductFormPackageCourseType[] | undefined = createMockPackageCourses()
): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: createMockStudentInfo(),
                productFieldArrayItems: [
                    {
                        product: createMockProductChoices()[0],
                        packageEntity: createMockProductPackageList()[0],
                        productPrices: createMockProductPriceList(),
                        productTax: createMockTaxDataList()[0],
                        discount: createMockDiscountChoices()[0],
                        packageCourses: packageCourses,
                        associatedProducts: undefined,
                    },
                ],
                comment: "test comment",
            },
        ],
        location: createMockCenterChoices()[0],
    };
};

export const createMockProductFieldArrayItem = (selectedSlots?: number[]): ProductsFormValues[] => {
    return [
        {
            product: createMockProductChoices()[0],
            packageEntity: createMockProductPackageList()[1],
            productPrices: createMockProductPriceList(),
            productTax: createMockTaxDataList()[0],
            discount: createMockDiscountChoices()[0],
            packageCourses: [
                {
                    packageCourse: createMockPackageCourseList()[0],
                    course: createMockCourseList()[0],
                    slot: selectedSlots?.[0] || 1,
                },
                {
                    packageCourse: createMockPackageCourseList()[1],
                    course: createMockCourseList()[1],
                    slot: selectedSlots?.[1] || 1,
                },
            ],
            associatedProducts: undefined,
        },
    ];
};

export const createMockOrderFormValueWithSlotBasedPackageCourses = (): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: createMockStudentInfo(),
                productFieldArrayItems: [
                    {
                        product: createMockProductChoices()[0],
                        packageEntity: createMockProductPackageList()[1],
                        productPrices: createMockProductPriceList(),
                        productTax: createMockTaxDataList()[0],
                        discount: createMockDiscountChoices()[0],
                        packageCourses: [
                            {
                                packageCourse: createMockPackageCourseList()[0],
                                course: createMockCourseList()[0],
                                slot: 1,
                            },
                            {
                                packageCourse: createMockPackageCourseList()[1],
                                course: createMockCourseList()[1],
                                slot: 1,
                            },
                            {
                                packageCourse: createMockPackageCourseList()[2],
                                course: createMockCourseList()[2],
                                slot: 1,
                            },
                            {
                                packageCourse: createMockPackageCourseList()[3],
                                course: createMockCourseList()[3],
                                slot: 1,
                            },
                        ],
                        associatedProducts: [],
                    },
                ],
                comment: "test comment",
            },
        ],
        location: createMockCenterChoices()[0],
    };
};

export const createMockOrderFormValueWithPackageCoursesAndAssociatedProducts =
    (): OrderFormValues => {
        return {
            students: [
                {
                    studentInfo: createMockStudentInfo(),
                    productFieldArrayItems: [
                        {
                            product: createMockProductChoices()[0],
                            packageEntity: createMockProductPackageList()[0],
                            productPrices: createMockProductPriceList(),
                            productTax: createMockTaxDataList()[0],
                            discount: createMockDiscountChoices()[0],
                            packageCourses: [
                                {
                                    packageCourse: createMockPackageCourseList()[0],
                                    course: createMockCourseList()[0],
                                },
                                {
                                    packageCourse: createMockPackageCourseList()[1],
                                    course: createMockCourseList()[1],
                                },
                                {
                                    packageCourse: createMockPackageCourseList()[2],
                                    course: createMockCourseList()[2],
                                },
                                {
                                    packageCourse: createMockPackageCourseList()[3],
                                    course: createMockCourseList()[3],
                                },
                            ],
                            associatedProducts: [
                                {
                                    product: createMockProductChoices()[1],
                                    material: createMockProductMaterialList()[0],
                                    productPrices: createMockProductPriceList(),
                                    productTax: createMockTaxDataList()[0],
                                    discount: createMockDiscountChoices()[0],
                                },
                                {
                                    product: createMockProductChoices()[2],
                                    fee: createMockProductFeeList()[0],
                                    productPrices: createMockProductPriceList(),
                                    productTax: createMockTaxDataList()[0],
                                    discount: createMockDiscountChoices()[0],
                                },
                            ],
                        },
                    ],
                    comment: "test comment",
                },
            ],
            location: createMockCenterChoices()[0],
        };
    };
