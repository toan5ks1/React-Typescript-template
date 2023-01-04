import { FieldArrayWithId } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { CourseType } from "src/squads/payment/types/service/course-types";

import { DeleteOutlined } from "@mui/icons-material";
import { Box, FormControl, Grid, InputLabel, Tooltip } from "@mui/material";
import IconButtonBase from "src/components/IconButton/IconButtonBase";
import SelectBase from "src/components/Select/SelectBase";
import {
    enableSlotSelect,
    getSlotOptions,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/helper";

import { PackageType } from "manabuf/payment/v1/enums_pb";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface PackageCourseDetailsListProps {
    packageType: PackageType;
    packageCourses: FieldArrayWithId<
        OrderFormValues,
        `students.${number}.productFieldArrayItems.${number}.packageCourses`,
        "id"
    >[];
    courseOptions: OptionSelectType[];
    onCourseSelect: (courseId: CourseType["course_id"], index: number) => void;
    handleDeleteCourse: (index: number) => void;
    onSlotSelect?: (slot: number, courseId: CourseType["course_id"], index: number) => void;
}

const PackageCourseDetailsList = ({
    packageType,
    packageCourses,
    courseOptions,
    onCourseSelect,
    handleDeleteCourse,
    onSlotSelect,
}: PackageCourseDetailsListProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const isCourseRequired = (mandatory: boolean): boolean => {
        return packageCourses.length === 1 || mandatory;
    };

    const getDeleteTooltipMessage = (index: number) => {
        const course = packageCourses[index];

        if (course.packageCourse?.mandatory_flag) {
            return tOrder("tooltip.deleteMandatoryCourse");
        }

        if (packageCourses.length === 1) {
            return tOrder("tooltip.atLeastOneCourseSelected");
        }

        return "";
    };
    const getSlotLabel = (packageType: PackageType) => {
        switch (packageType) {
            case PackageType.PACKAGE_TYPE_FREQUENCY:
                return `# ${tOrder("label.slotWeek")}`;
            default:
                return `# ${tOrder("label.slot")}`;
        }
    };

    return (
        <>
            {packageCourses.map((packageCourse, index) => {
                return (
                    <Grid
                        key={`${packageCourse.id}-${packageCourse.course.course_id}`}
                        container
                        mt={2}
                        pl={3.75}
                        height="40px"
                        wrap="nowrap"
                    >
                        <Grid item xs={enableSlotSelect(packageType) ? 9 : 11}>
                            <Box marginRight={2}>
                                <FormControl variant="outlined" size={"small"} fullWidth>
                                    <InputLabel
                                        id={`${index}-packageCourse-label`}
                                        required={isCourseRequired(
                                            packageCourse.packageCourse.mandatory_flag
                                        )}
                                    >
                                        {tOrder("label.courseAssociation")}
                                    </InputLabel>
                                    <SelectBase
                                        label={tOrder("label.courseAssociation")}
                                        labelId={`${index}-packageCourse-label`}
                                        data-testid="PackageCourseDetails__select"
                                        value={packageCourse.course.course_id}
                                        options={courseOptions}
                                        isTranslated={false}
                                        onChange={(e) =>
                                            onCourseSelect(
                                                e.target.value as CourseType["course_id"],
                                                index
                                            )
                                        }
                                        readOnly={packageCourse.packageCourse.mandatory_flag}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>

                        {enableSlotSelect(packageType) && (
                            <Grid item xs={2}>
                                <FormControl variant="outlined" size={"small"} fullWidth>
                                    <InputLabel id={`${index}-packageCourse-slot-label`} required>
                                        {getSlotLabel(packageType)}
                                    </InputLabel>
                                    <SelectBase
                                        label={getSlotLabel(packageType)}
                                        labelId={`${index}-packageCourse-slot-label`}
                                        data-testid="PackageCourseDetailsSlot__select"
                                        value={packageCourse.slot}
                                        options={getSlotOptions(packageCourse.packageCourse)}
                                        isTranslated={false}
                                        onChange={(e) => {
                                            const value = e.target.value as string;

                                            onSlotSelect?.(
                                                parseInt(value, 10),
                                                packageCourse.course.course_id,
                                                index
                                            );
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        )}

                        <Grid item xs={1} textAlign="right" marginBottom={2}>
                            <Tooltip title={getDeleteTooltipMessage(index)} placement="top">
                                <Box>
                                    <IconButtonBase
                                        onClick={() => handleDeleteCourse(index)}
                                        data-testid="PackageCourseDetails__delete"
                                        color="error"
                                        disabled={isCourseRequired(
                                            packageCourse.packageCourse?.mandatory_flag
                                        )}
                                    >
                                        <DeleteOutlined fontSize="small" />
                                    </IconButtonBase>
                                </Box>
                            </Tooltip>
                        </Grid>
                    </Grid>
                );
            })}
        </>
    );
};

export default PackageCourseDetailsList;
