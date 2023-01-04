import { useMemo } from "react";

import { DeepPartial, FormProvider, UnpackNestedValue, useForm, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";

import Box from "@mui/material/Box";
import DividerDashed from "src/components/Divider/DividerDashed";
import FormFilterAdvanced from "src/components/Forms/FormFilterAdvanced";

import SchoolFields from "./SchoolFields";
import StudentFields from "./StudentFields";
import StudyItemFields from "./StudyItemFields";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useConvertFilterFields, {
    FormFilterStudentValues,
    formFilterStudentDefaultValues,
} from "src/squads/user/modules/student-list/hooks/useConvertFilterFields";
import useFormFilterAdvanced from "src/squads/user/modules/student-list/hooks/useFormFilterAdvanced";

const NUMBER_PADDING = 48;
const WITH_POPUP_FOLLOW_DESIGN = 560; //https://www.figma.com/file/K7yUAS6XHGTh7SFNHQtU2p/%5BFinal%5D-Student-Management?node-id=1008%3A372659

export interface FormFilterStudentProps {
    valueFilters?: FormFilterStudentValues;
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: UnpackNestedValue<DeepPartial<FormFilterStudentValues>>) => void;
}

const FormFilterStudent = (props: FormFilterStudentProps) => {
    const {
        valueFilters = formFilterStudentDefaultValues,
        onEnterSearchBar,
        onApplySubmit,
    } = props;
    const tStudentErp = useResourceTranslate(ERPModules.STUDENTS);

    const methods = useForm<FormFilterStudentValues>({
        defaultValues: valueFilters,
    });

    const { courses, grades, isNotLogged } = useWatch({ ...methods });

    const { filterFieldObjects, filterAppliedFieldObjects } = useConvertFilterFields({
        valueFilters,
    });

    const isNoData = useMemo(
        () => !(arrayHasItem(courses) || arrayHasItem(grades) || isNotLogged),
        [courses, grades, isNotLogged]
    );

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FormFilterStudentValues>({
            defaultValue: formFilterStudentDefaultValues,
            isNoData,
            filterFieldObjects,
            filterAppliedFieldObjects,
            onApplySubmit,
            ...methods,
        });

    return (
        <FormProvider {...methods}>
            <FormFilterAdvanced<FormFilterStudentValues>
                isDisableReset={isNoData}
                filterNameApplied={filterApplied}
                onEnterSearchBar={onEnterSearchBar}
                onDelete={onDelete}
                onReset={onReset}
                onApply={methods.handleSubmit(onApply)}
                onClosePopover={onClosePopover}
                inputSearchPlaceholder={tStudentErp("placeholder.enterYourKeyword")}
            >
                <Box
                    width={WITH_POPUP_FOLLOW_DESIGN - NUMBER_PADDING}
                    data-testid="FormFilterStudent__root"
                >
                    <StudentFields
                        grades={filterFieldObjects.grades}
                        isNotLogged={filterFieldObjects.isNotLogged}
                    />
                    <Box pt={1} pb={2}>
                        <DividerDashed />
                    </Box>
                    <SchoolFields />
                    <Box py={2}>
                        <DividerDashed />
                    </Box>
                    <StudyItemFields courses={filterFieldObjects.courses} />
                </Box>
            </FormFilterAdvanced>
        </FormProvider>
    );
};

export default FormFilterStudent;
