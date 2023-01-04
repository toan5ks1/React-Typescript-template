import { useMemo } from "react";

import { inferQuery } from "src/squads/syllabus/services/infer-query";

import TextPreview, { TextPreviewProps } from "src/squads/syllabus/components/TextPreview";

export interface ReferenceReviewFieldProps extends Omit<TextPreviewProps, "value"> {
    value: string[];
    label: string;
}

const ReferenceReviewField = (props: ReferenceReviewFieldProps) => {
    const { value, label, ...rest } = props;

    const { data } = inferQuery({
        entity: "learningObjective",
        action: "LO_GET_MANY_BY_IDS",
    })(
        {
            lo_id: value,
        },
        {
            enabled: true,
        }
    );

    const values = useMemo(() => {
        if (!data) return "";

        return data.map((e) => e.name).join(", ");
    }, [data]);

    return <TextPreview {...rest} title={label} value={values} />;
};

export default ReferenceReviewField;
