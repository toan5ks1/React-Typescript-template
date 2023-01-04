import { memo, useCallback, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { toArr } from "src/common/utils/other";
import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";
import { Syllabus_LearningObjectiveListQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import AutocompleteBase from "src/components/Autocompletes/AutocompleteBase";

import { BaseAutocompleteProps } from "../BaseAutocomplete";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface LOsAutocompleteProps
    extends Omit<BaseAutocompleteProps<LOWithQuizSet>, "optionLabelKey" | "options" | "onChange"> {
    value: any;
    required?: boolean;
    onChange: (LOIds: string[]) => void;
}

const FormAutocomplete = (props: LOsAutocompleteProps) => {
    const [skip, setSkip] = useState(false);
    const tQuiz = useResourceTranslate(Entities.QUIZZES);

    const { onChange } = props;

    const { data = [], isLoading } = inferQuery({
        entity: "learningObjective",
        action: "LO_GET_MANY_BY_IDS",
    })(
        {
            lo_id: props.value,
        },
        {
            enabled: !skip,
            onSuccess: () => {
                setSkip(true);
            },
        }
    );

    if (isLoading)
        return (
            <AutocompleteBase<{ id: string }>
                size="medium"
                options={[]}
                getOptionSelectedField="id"
                optionLabelKey={"id"}
                loading
                disabled
                label={tQuiz("taggedLO")}
                data-testid="LOsAutocomplete__loading"
            />
        );

    return <LOsAutocomplete LOs={data} onChange={onChange} />;
};

const LOsAutocomplete = ({
    LOs,
    onChange,
}: {
    LOs: Syllabus_LearningObjectiveListQuery["learning_objectives"];
    onChange: (LOIds: string[]) => void;
}) => {
    const [search, setSearch] = useState("");
    const tQuiz = useResourceTranslate(Entities.QUIZZES);

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

    const _onChange = useCallback(
        (selected: Syllabus_LearningObjectiveListQuery["learning_objectives"]) => {
            const arr = toArr(selected); //make sure it is array

            const values = arr.map((e) => e.lo_id);

            onChange(values);
        },
        [onChange]
    );

    return (
        <AutocompleteBase<Syllabus_LearningObjectiveListQuery["learning_objectives"][0]>
            multiple
            filterSelectedOptions
            size="medium"
            label={tQuiz("taggedLO")}
            optionLabelKey="name"
            getOptionSelectedField="lo_id"
            defaultValue={LOs}
            options={[...LOs, ...data]}
            onInputChange={(_, value) => setSearch(value)}
            loading={isFetching}
            onChange={(_, value) => {
                _onChange(value as Syllabus_LearningObjectiveListQuery["learning_objectives"]);
            }}
        />
    );
};

export default memo(FormAutocomplete);
