import { ProductFormPackageCourseType } from "src/squads/payment/types/form/order-form-types";

import { List, ListItem, ListItemText, TypographyVariant } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface PackageCourseBilledDetailProps {
    packageCourses: ProductFormPackageCourseType[] | undefined;
    variant?: TypographyVariant;
    renderCourseSlot?: (slot: number | undefined) => string;
}

const PackageCourseBilledAtOrderDetail = ({
    packageCourses,
    variant = "body2",
    renderCourseSlot,
}: PackageCourseBilledDetailProps) => {
    const color = variant === "caption" ? "textSecondary" : "textPrimary";

    return (
        <List disablePadding={true} sx={{ listStyleType: "disc", paddingLeft: "1.5em" }}>
            {packageCourses?.map((courses) => (
                <ListItem
                    data-testid="MenuItemLink__root"
                    key={courses.course.course_id}
                    disablePadding={true}
                    sx={{ display: "list-item" }}
                >
                    <ListItemText
                        primary={
                            <TypographyBase
                                variant={variant}
                                color={color}
                                data-testid="PackageCourseBilledDetail__course"
                            >
                                {courses.course.name}
                                {renderCourseSlot && renderCourseSlot(courses.slot)}
                            </TypographyBase>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default PackageCourseBilledAtOrderDetail;
