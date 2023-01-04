import { forwardRef, useCallback, useImperativeHandle, useMemo } from "react";

import { useFieldArray } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { ArrayElement, OptionSelectType } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { getEntityBasedOnProductType } from "src/squads/payment/helpers/product-type";
import {
    OrderFormValues,
    AssociatedProductDetails,
} from "src/squads/payment/types/form/order-form-types";
import { CourseType } from "src/squads/payment/types/service/course-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { Box, Grid, Tooltip } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ProductListItemAccordionWithState from "src/squads/payment/components/Sections/ProductListSection/ProductListItem/ProductListItemAccordionWithState";
import AssociatedProductsList from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/AssociateProducts/AssociatedProductsList";

import { FeeType, MaterialType } from "manabuf/payment/v1/enums_pb";

import useAssociatedProducts from "src/squads/payment/domains/OrderManagement/hooks/useAssociatedProducts";
import useWatchSelectedProductIds from "src/squads/payment/domains/OrderManagement/hooks/useWatchSelectedProductIds";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface AssociatedProductsRef {
    removeAllAssociatedProducts: () => void;
}
export interface AssociatedProductsProps {
    productFieldArrayItem: ArrayElement<
        ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
    >;
    productFieldItemIndex: number;
    studentIndex: number;
}

const AssociatedProducts = forwardRef<AssociatedProductsRef, AssociatedProductsProps>(
    ({ productFieldArrayItem, productFieldItemIndex, studentIndex }, ref) => {
        const { fields, append, remove, update } = useFieldArray<
            OrderFormValues,
            `students.${number}.productFieldArrayItems.${number}.associatedProducts`
        >({
            name: `students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.associatedProducts`,
        });

        useImperativeHandle(ref, () => ({
            removeAllAssociatedProducts: remove,
        }));

        const appendAssociatedProductWithDefaultValue = (): void => {
            const unselectedAssociatedProductOptions = associatedProductsOptions.find(
                (associatedProduct) => !associatedProduct.disabled
            );

            const unselectedAssociatedProduct = associatedProductsWithSelectedCourses.find(
                (associatedProduct) =>
                    associatedProduct.product.product_id === unselectedAssociatedProductOptions?.id
            );

            if (unselectedAssociatedProduct) {
                append(unselectedAssociatedProduct);
            }
        };

        const { product, packageCourses } = productFieldArrayItem;
        const selectedCourseIds: CourseType["course_id"][] | undefined = packageCourses?.map(
            (packageCourse) => packageCourse.course.course_id
        );

        const {
            packageCourseMaterials,
            packageCourseFees,
            productDetails,
            productFees,
            productMaterials,
            productPrices,
            productTaxes,
            isFetchedAll,
        } = useAssociatedProducts({
            productId: product?.product_id,
        });

        const associatedProducts: AssociatedProductDetails[] = useMemo(() => {
            const updatedAssociatedProducts: AssociatedProductDetails[] = [];
            if (!isFetchedAll) return updatedAssociatedProducts;

            productDetails?.forEach((productDetail) => {
                const { product_id: productId } = productDetail;

                const productPrice = productPrices?.filter(
                    (productPrice) => productPrice.product_id === productId
                );

                if (!productDetail || !productPrice) return;

                const productTax = productTaxes?.find(
                    (productTax) => productTax.tax_id === productDetail?.tax_id
                );

                const productType = getEntityBasedOnProductType(productDetail.product_type);
                if (productType === "fee") {
                    const courseId = packageCourseFees?.find(
                        (packageCourseFee) => packageCourseFee.fee_id === productId
                    )?.course_id;
                    const productFee = productFees?.find(
                        (productFee) => productFee.fee_id === productId
                    );

                    updatedAssociatedProducts.push({
                        product: productDetail,
                        fee: {
                            fee_type: FeeType[productFee?.fee_type ?? "FEE_TYPE_NONE"],
                        },
                        productPrices: productPrice,
                        productTax: productTax,
                        courseId: courseId,
                    });
                } else {
                    const courseId = packageCourseMaterials?.find(
                        (packageCourseMaterial) => packageCourseMaterial.material_id === productId
                    )?.course_id;

                    const productMaterial = productMaterials?.find(
                        (productMaterial) => productMaterial.material_id === productId
                    );
                    updatedAssociatedProducts.push({
                        product: productDetail,
                        material: {
                            material_type:
                                MaterialType[
                                    productMaterial?.material_type ?? "MATERIAL_TYPE_NONE"
                                ],
                            custom_billing_date: productMaterial?.custom_billing_date,
                        },
                        productPrices: productPrice,
                        productTax: productTax,
                        courseId: courseId,
                    });
                }
            });

            return updatedAssociatedProducts;
        }, [
            isFetchedAll,
            packageCourseFees,
            packageCourseMaterials,
            productDetails,
            productFees,
            productMaterials,
            productPrices,
            productTaxes,
        ]);

        const associatedProductsWithSelectedCourses = useMemo((): AssociatedProductDetails[] => {
            if (!arrayHasItem(selectedCourseIds)) return [];

            return associatedProducts.filter((associatedProduct) =>
                selectedCourseIds!.includes(associatedProduct.courseId ?? "")
            );
        }, [associatedProducts, selectedCourseIds]);

        const { selectedProductIds } = useWatchSelectedProductIds(studentIndex);
        const associatedProductsOptions = useMemo((): OptionSelectType[] => {
            return associatedProductsWithSelectedCourses.map((associatedProduct) => {
                const isDisabled = selectedProductIds?.includes(
                    associatedProduct.product.product_id
                );
                return {
                    id: associatedProduct.product.product_id,
                    value: associatedProduct.product.name,
                    label: associatedProduct.product.name,
                    disabled: isDisabled,
                };
            });
        }, [associatedProductsWithSelectedCourses, selectedProductIds]);

        const onAssociatedProductSelect = useCallback(
            (productId: ProductTypeQuery["product_id"], index: number) => {
                const associatedProduct = associatedProducts.find(
                    (associatedProduct) => associatedProduct.product.product_id === productId
                );
                if (associatedProduct) {
                    update(index, associatedProduct);
                }
            },
            [associatedProducts, update]
        );

        const isAllOptionsDisabled =
            associatedProductsOptions.length ===
            associatedProductsOptions.filter((associatedProduct) => associatedProduct.disabled)
                .length;

        const tOrder = useResourceTranslate(Entities.ORDERS);
        const t = useTranslate();
        const getAddTooltipMessage = () => {
            if (isAllOptionsDisabled) return tOrder("tooltip.associatedProductsLimitReached");

            return "";
        };

        return (
            <Grid container spacing={2} data-testid="AssociatedProducts__root" mt={-2}>
                <Grid item xs={12}>
                    <ProductListItemAccordionWithState
                        base={
                            <Grid item xs={12}>
                                <TypographyBase variant="subtitle2" pl={0.25}>
                                    {tOrder("title.associatedProducts")}
                                </TypographyBase>
                            </Grid>
                        }
                        size="small"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AssociatedProductsList
                                    associatedProducts={fields}
                                    associatedProductsOptions={associatedProductsOptions}
                                    productFieldItemIndex={productFieldItemIndex}
                                    onAssociatedProductSelect={onAssociatedProductSelect}
                                    handleDeleteAssociatedProduct={remove}
                                    studentIndex={studentIndex}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box textAlign="center" display="flex" justifyContent="center">
                                    <Tooltip title={getAddTooltipMessage()} placement="top">
                                        <Box width="100%">
                                            <ButtonCreate
                                                fullWidth
                                                onClick={() =>
                                                    appendAssociatedProductWithDefaultValue()
                                                }
                                                data-testid="AssociatedProducts__addButton"
                                                variant="text"
                                                disabled={isAllOptionsDisabled}
                                            >
                                                {t("resources.button.addAssociatedProducts")}
                                            </ButtonCreate>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    </ProductListItemAccordionWithState>
                </Grid>
            </Grid>
        );
    }
);

export default AssociatedProducts;
