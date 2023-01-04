import { useEffect } from "react";

import {
    FieldError,
    FieldNamesMarkedBoolean,
    useFormContext,
    ValidateResult,
} from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import { KeyProductPackageTypes } from "src/squads/payment/constants/const";
import { getTotalSelectedSlotPackages } from "src/squads/payment/helpers/packages";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { UseFormRules } from "src/squads/payment/typings/react-hook-form";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import isEmpty from "lodash/isEmpty";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

interface UseSectionRequiredValidationType {
    studentIndex: number;
    errorMessage?: string;
}

export interface useOrderValidationRulesReturn {
    validationRules: {
        product: (
            productArrayItem: ProductsFormValues,
            orderType?: OrderType
        ) => UseFormRules["rules"];
        location: UseFormRules["rules"];
        startDate: UseFormRules["rules"];
    };
    errorMessages: {
        productArrayTable: (index: number) => ValidateResult;
    };
    requiredSection: ({ studentIndex, errorMessage }: UseSectionRequiredValidationType) => void;
}

export const isProductSlotExceeded = ({
    packageEntity,
    packageCourses,
}: ProductsFormValues): boolean => {
    const maxSlot = packageEntity?.max_slot;
    if (!maxSlot || !packageCourses?.length) return false;

    const totalSelectedSlots = getTotalSelectedSlotPackages(packageCourses);
    return totalSelectedSlots > maxSlot;
};

export const isProductPriceNonExist = ({
    packageCourses,
    productPrices,
}: ProductsFormValues): boolean => {
    const totalWeight = packageCourses?.reduce(
        (total, { packageCourse: { course_weight } }) => total + (course_weight || 0),
        0
    );
    return !productPrices?.find(({ quantity }) => quantity === totalWeight);
};

const useSectionRequiredValidation = ({
    studentIndex,
    errorMessage,
}: UseSectionRequiredValidationType) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { getValues, register, clearErrors } = useFormContext<OrderFormValues>();

    const productFieldArrayItemOfEachStudent =
        getValues("students")[studentIndex].productFieldArrayItems;

    useEffect(() => {
        if (isEmpty(productFieldArrayItemOfEachStudent)) {
            register(`students.${studentIndex}.productFieldArrayItems`, {
                required: {
                    value: true,
                    message: convertString(
                        errorMessage ? errorMessage : tOrder("message.error.requiredSection")
                    ),
                },
            });
        } else {
            clearErrors(`students.${studentIndex}.productFieldArrayItems`);
        }
    }, [
        productFieldArrayItemOfEachStudent,
        studentIndex,
        errorMessage,
        tOrder,
        register,
        clearErrors,
    ]);
};

const isRequiredFieldError = <T extends object>(obj: FieldError | T): obj is FieldError => {
    return obj && typeof obj === "object" && "type" in obj && obj.type === "required";
};

const useOrderValidationRules = (): useOrderValidationRulesReturn => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const {
        formState: { dirtyFields, errors },
    } = useFormContext<OrderFormValues>();

    const getProductArrayTableErrorMessage = (studentIndex: number): ValidateResult => {
        const productFieldArrayItemsError = errors.students?.[studentIndex]?.productFieldArrayItems;
        if (!productFieldArrayItemsError) return;

        if (isRequiredFieldError(productFieldArrayItemsError)) {
            return productFieldArrayItemsError.message;
        } else {
            const productErrors = productFieldArrayItemsError?.filter(Boolean);
            const errorAmount = productErrors?.length;
            if (!errorAmount) return;

            switch (true) {
                case errorAmount === 1: {
                    const { product: productError, recurringDetails: recurringDetailsError } =
                        productErrors[0];

                    if (productError) {
                        const productAsFieldError = productError as FieldError;

                        return productAsFieldError.message;
                    }

                    if (recurringDetailsError) {
                        const { startDate } = recurringDetailsError;
                        if (startDate) {
                            return t("ra.validation.requiredAll");
                        }
                    }

                    return undefined;
                }

                case errorAmount > 1: {
                    return tOrder("message.error.commonProductError");
                }
                default:
                    return;
            }
        }
    };

    const validateNewOrder = (productArrayItem: ProductsFormValues): ValidateResult => {
        try {
            if (!arrayHasItem(productArrayItem?.packageCourses)) return undefined;

            const { productExtensionType } = getProductAndProductExtensionType(productArrayItem);
            switch (productExtensionType) {
                case KeyProductPackageTypes.PACKAGE_TYPE_SLOT_BASED:
                case KeyProductPackageTypes.PACKAGE_TYPE_FREQUENCY: {
                    return (
                        (isProductSlotExceeded(productArrayItem) || undefined) &&
                        tOrder("message.error.invalidProduct")
                    );
                }
                case KeyProductPackageTypes.PACKAGE_TYPE_SCHEDULED:
                case KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME: {
                    return (
                        (isProductPriceNonExist(productArrayItem) || undefined) &&
                        tOrder("message.error.invalidProduct")
                    );
                }
                default:
                    return undefined;
            }
        } catch {
            return tOrder("message.error.invalidProduct");
        }
    };

    const validateUpdateOrder = (
        dirtyFields: FieldNamesMarkedBoolean<OrderFormValues>
    ): ValidateResult => {
        const isOneOfTheStudentProductsUpdated = dirtyFields?.students?.find(
            (student) => "productFieldArrayItems" in student
        );

        if (!isOneOfTheStudentProductsUpdated) return tOrder("message.error.noUpdatedField");

        return;
    };

    return {
        validationRules: {
            product: (productArrayItem, orderType = OrderType.ORDER_TYPE_NEW) => {
                return {
                    required: t("resources.input.error.required"),
                    validate: () => {
                        switch (orderType) {
                            case OrderType.ORDER_TYPE_NEW: {
                                return validateNewOrder(productArrayItem);
                            }
                            case OrderType.ORDER_TYPE_UPDATE: {
                                return validateUpdateOrder(dirtyFields);
                            }
                            default:
                                return;
                        }
                    },
                };
            },
            location: {
                required: t("resources.input.error.required"),
            },
            startDate: {
                required: true,
            },
        },
        errorMessages: {
            productArrayTable: getProductArrayTableErrorMessage,
        },
        requiredSection: useSectionRequiredValidation,
    };
};

export default useOrderValidationRules;
