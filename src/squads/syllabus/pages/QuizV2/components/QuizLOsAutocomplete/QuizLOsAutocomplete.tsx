import { FC, useCallback, useState } from "react";

import { useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { Quiz } from "src/squads/syllabus/models/quiz";
import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const QuizLOsAutocomplete: FC = () => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const { getValues, setValue } = useFormContext<Quiz>();
    const [initialLoaded, setInitialLoaded] = useState(false);
    const [search, setSearch] = useState<string>();

    const { data: initialLOs = [], isLoading: isLoadingInitialLOs } = inferQuery({
        entity: "learningObjective",
        action: "LO_GET_MANY_BY_IDS",
    })<LOWithQuizSet[]>(
        {
            lo_id: getValues("taggedLOs") as string[],
        },
        {
            enabled: !initialLoaded,
            onSuccess: (data) => {
                setInitialLoaded(true);
                setValue("taggedLOs", data);
            },
        }
    );

    const { data = [], isFetching } = inferQuery({
        entity: "learningObjective",
        action: "LO_GET_LIST",
    })(
        {
            name: search,
            limit: 10,
        },
        {
            enabled: true,
        }
    );

    const onSearch = useCallback((_, value: string) => {
        setSearch(value);
    }, []);

    return (
        <AutocompleteHF
            name="taggedLOs"
            label={t("taggedLO")}
            options={[...initialLOs, ...data]}
            multiple
            filterSelectedOptions
            optionLabelKey="name"
            getOptionSelectedField="lo_id"
            loading={isFetching || isLoadingInitialLOs}
            onInputChange={onSearch}
        />
    );
};

export default QuizLOsAutocomplete;
