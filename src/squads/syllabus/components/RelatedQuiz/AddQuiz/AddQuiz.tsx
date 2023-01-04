import { useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import ButtonCreate from "src/components/Buttons/ButtonCreate";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface AddQuizProps {
    searchURL?: string;
}

const AddQuiz = (props: AddQuizProps) => {
    const { searchURL = "" } = props;
    const t = useTranslate();
    const navigation = useNavigation();

    const onAddQuiz = useCallback(() => {
        navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.QUIZZES}/create${searchURL}`);
    }, [navigation, searchURL]);

    return <ButtonCreate onClick={onAddQuiz}>{t("ra.common.action.add")}</ButtonCreate>;
};

export default AddQuiz;
