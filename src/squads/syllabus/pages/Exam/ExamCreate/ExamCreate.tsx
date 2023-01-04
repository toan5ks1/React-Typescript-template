import { useCallback } from "react";

import { useLocation } from "react-router";
import { Entities, EurekaEntities, ProviderTypes } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import ExamUpsertDialog from "src/squads/syllabus/pages/Exam/ExamUpsertDialog";
import { createLOEmptyFormData } from "src/squads/syllabus/pages/Exam/utils/exam";

const ExamCreate = () => {
    const tExam = useResourceTranslate(EurekaEntities.EXAM_LO);

    const { search } = useLocation();

    // Getting the parentId for topicId because of legacy code
    const { bookId, parentId: topicId } = parseQuery(search);
    const navigation = useNavigation();

    const emptyLOFormData = createLOEmptyFormData();

    const handleOnCloseUpsertExamLO = useCallback(() => {
        navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${bookId}/show`);
    }, [bookId, navigation]);

    return (
        <ExamUpsertDialog
            action={ProviderTypes.CREATE}
            title={tExam("editExam")}
            topicId={String(topicId)}
            defaultValues={emptyLOFormData}
            onClose={handleOnCloseUpsertExamLO}
        />
    );
};

export default ExamCreate;
