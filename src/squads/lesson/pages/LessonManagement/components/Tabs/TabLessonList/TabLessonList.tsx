import { ReactNode } from "react";

import { UseFormReturn } from "react-hook-form";
import { Features } from "src/common/constants/enum";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import HookForm from "src/components/Forms/HookForm";
import FormFilterAdvancedLesson from "src/squads/lesson/pages/LessonManagement/components/Forms/FormFilterAdvancedLesson";
import FormFilterAdvancedLessonV2 from "src/squads/lesson/pages/LessonManagement/components/Forms/FormFilterAdvancedLessonV2";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { FormFilterLessonManagementValues } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForFormFilterAdvancedLessonManagement";
import { FormFilterLessonManagementValuesV2 } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonManagementListFormFilterAdvancedV2";

export interface TabLessonListProps {
    table: ReactNode;
    onCreate: () => void;
    onFilter: (data: FormFilterLessonManagementValues) => void; // TODO: remove this fn when Lesson Group is enabled (LT-13375)
    onFilterV2: (data: FormFilterLessonManagementValuesV2) => void;
    onSearch: (keyword: string) => void;
    methods?: UseFormReturn<FormFilterLessonManagementValues>;
    keyword: string;
}

const TabLessonList = (props: TabLessonListProps) => {
    const { table, onCreate, methods, onFilter, onSearch, keyword, onFilterV2 } = props;
    const { isEnabled: isEnabledLessonGroup } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_LESSON_GROUP
    );
    const t = useTranslate();

    return (
        <Box mt={3} mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="start">
                <HookForm methods={methods}>
                    {isEnabledLessonGroup ? (
                        <FormFilterAdvancedLessonV2
                            onApplySubmit={onFilterV2}
                            onEnterSearchBar={onSearch}
                            defaultKeyword={keyword}
                        />
                    ) : (
                        <FormFilterAdvancedLesson
                            onApplySubmit={onFilter}
                            onEnterSearchBar={onSearch}
                            defaultKeyword={keyword}
                        />
                    )}
                </HookForm>
                <ButtonCreate data-testid="TabLessonList__buttonAdd" onClick={onCreate}>
                    {t("ra.action.add")}
                </ButtonCreate>
            </Box>
            <Box mt={2}>{table}</Box>
        </Box>
    );
};

export default TabLessonList;
