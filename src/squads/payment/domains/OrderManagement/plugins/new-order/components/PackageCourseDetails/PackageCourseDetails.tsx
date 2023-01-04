import { useState } from "react";

import { useFieldArray } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { Payment_GetManyCourseByCourseIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { PackageCourseType } from "src/squads/payment/types/service/package-course-types";

import { Box, Grid, Tooltip } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import Loading from "src/components/Loading";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ProductListItemAccordionWithState from "src/squads/payment/components/Sections/ProductListSection/ProductListItem/ProductListItemAccordionWithState";
import PackageCourseDetailsList from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/components/PackageCourseDetailsList";
import PackageCourseSlotInformation from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/components/PackageCourseSlotInformation";
import { enableSlotSelect } from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/helper";
import usePackageCoursesInteractions from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/usePackageCoursesInteractions";

import { PackageType } from "manabuf/payment/v1/enums_pb";

import useCourses from "src/squads/payment/domains/OrderManagement/hooks/useCourses";
import usePackageCourses from "src/squads/payment/domains/OrderManagement/hooks/usePackageCourses";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";
import useTriggerValidationByFormValuesChange from "src/squads/payment/hooks/useTriggerValidationByFormValuesChange";

export interface PackageCourseDetailsProps {
    packageType: PackageType;
    productFieldArrayItem: ArrayElement<
        ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
    >;
    productFieldItemIndex: number;
    studentIndex: number;
    onPackageCoursesChange: () => void;
}

const PackageCourseDetails = ({
    packageType,
    productFieldArrayItem: { product, packageEntity },
    productFieldItemIndex,
    studentIndex,
    onPackageCoursesChange,
}: PackageCourseDetailsProps) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const fieldArrayMethods = useFieldArray<
        OrderFormValues,
        `students.${number}.productFieldArrayItems.${number}.packageCourses`
    >({
        name: `students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.packageCourses`,
    });
    const { fields } = fieldArrayMethods;
    const [packageCourses, setPackageCourses] = useState<PackageCourseType[]>([]);

    const { isFetching: isCoursesFetching, data: courseDetails } = useCourses({
        courseIds: packageCourses.map((course) => course.course_id),
        onSuccess: (data: Payment_GetManyCourseByCourseIdsQuery["courses"]): void => {
            if (!arrayHasItem(data)) return;

            // only append mandatory or default courses if there is no course in the package
            if (!fields?.length) {
                appendMandatoryOrDefaultCourses(data);
            }
        },
    });

    const { isFetching: isPackageCoursesFetching } = usePackageCourses({
        packageId: product?.product_id,
        onSuccess: setPackageCourses,
    });
    const {
        packageCourseOptions,
        totalSelectedSlot,
        addPackageCourse,
        onPackageCourseSelect,
        removePackageCourse,
        appendMandatoryOrDefaultCourses,
        onSlotSelect,
    } = usePackageCoursesInteractions({
        packageType,
        packageCourses,
        courseDetails,
        packageCoursesFieldArrayMethods: fieldArrayMethods,
        onPackageCoursesChange,
    });

    const tooltipMessageAdd =
        fields.length === packageCourses.length ? tOrder("tooltip.courseLimitReached") : "";

    useTriggerValidationByFormValuesChange({
        deps: fields,
        fieldName: `students.${studentIndex}`,
    });

    return (
        <Grid container spacing={2} data-testid="PackageCourseDetails__root" mt={-2}>
            <Grid item xs={12}>
                <ProductListItemAccordionWithState
                    base={
                        <Grid item xs={12}>
                            <TypographyBase variant="subtitle2" pl={0.25}>
                                {tOrder("title.course")}
                            </TypographyBase>
                        </Grid>
                    }
                    size="small"
                >
                    {isPackageCoursesFetching || isCoursesFetching ? (
                        <Grid item xs={12}>
                            <Loading />
                        </Grid>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <PackageCourseSlotInformation
                                    visible={enableSlotSelect(packageType)}
                                    totalSelectedSlot={totalSelectedSlot}
                                    maxSlot={packageEntity?.max_slot}
                                />

                                <PackageCourseDetailsList
                                    packageType={packageType}
                                    packageCourses={fields}
                                    courseOptions={packageCourseOptions}
                                    onCourseSelect={onPackageCourseSelect}
                                    handleDeleteCourse={removePackageCourse}
                                    onSlotSelect={onSlotSelect}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box textAlign="center" display="flex" justifyContent="center">
                                    <Tooltip title={tooltipMessageAdd} placement="top">
                                        <Box width="100%">
                                            <ButtonCreate
                                                fullWidth
                                                onClick={addPackageCourse}
                                                data-testid="PackageCourseDetails__addButton"
                                                variant="text"
                                                disabled={fields.length === packageCourses.length}
                                            >
                                                {t("resources.button.addCourse")}
                                            </ButtonCreate>
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </ProductListItemAccordionWithState>
            </Grid>
        </Grid>
    );
};

export default PackageCourseDetails;
