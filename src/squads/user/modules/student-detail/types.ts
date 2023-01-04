import { TypographyWithValueProps } from "src/components/Typographys/TypographyWithValue";

export interface StudentInfoSchema
    extends Pick<
        TypographyWithValueProps,
        | "label"
        | "value"
        | "xsLabel"
        | "xsValue"
        | "styleValue"
        | "classNameLabel"
        | "classNameValue"
        | "dataTestidLabel"
        | "dataTestidValue"
    > {}

export interface GroupsBoxStudentInfo {
    childElements: StudentInfoSchema[];
}
