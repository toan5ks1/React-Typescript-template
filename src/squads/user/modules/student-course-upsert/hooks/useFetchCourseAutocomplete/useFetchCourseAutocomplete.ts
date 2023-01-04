import { useState, useEffect, useRef, useMemo } from "react";

import debounce from "lodash/debounce";
import { useUnmount } from "react-use";
import { FormSize } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { DebouncedTime } from "src/squads/user/common/constants/enum";
import { User_CoursesManyReferenceWithLocationV2Query } from "src/squads/user/service/bob/bob-types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import { getLabel } from "src/components/Autocompletes/AutocompleteBase";
import { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface CoursesLocationChoiceTypes
    extends ArrayElement<User_CoursesManyReferenceWithLocationV2Query["courses"]> {
    value: string;
}

export interface useFetchCourseAutocompleteProps
    extends Pick<
        AutocompleteHFProps<CoursesLocationChoiceTypes>,
        "optionHelperText" | "multiple" | "limitChipText"
    > {
    locationIds?: string[];
    optionLabelKey?: string;
    size?: FormSize;
}
export interface useFetchCourseAutocompleteReturns {
    options: CoursesLocationChoiceTypes[];
    setInputValDebounced: (arg: string) => void;
    loading?: boolean;
}

const useFetchCourseAutocomplete = ({
    optionLabelKey = "name",
    limitChipText,
    locationIds,
}: useFetchCourseAutocompleteProps): useFetchCourseAutocompleteReturns => {
    const [inputVal, setInputVal] = useState("");
    const [data, setData] = useState<CoursesLocationChoiceTypes[]>([]);
    const [loading, setLoading] = useState(false);

    const t = useTranslate();

    const showSnackbar = useShowSnackbar();

    const setInputValDebounced = useMemo(
        () => debounce(setInputVal, DebouncedTime.AUTO_COMPETE_COURSE),
        [setInputVal]
    );

    const unMountedRef = useRef<boolean>(false);

    useUnmount(() => {
        unMountedRef.current = true;
    });

    useEffect(() => {
        void (async () => {
            setLoading(true);
            try {
                const choices = await inferStandaloneQuery({
                    entity: "course",
                    action: "userGetManyCoursesReferenceWithLocation",
                })({
                    filter: { [optionLabelKey]: inputVal, location_ids: locationIds },
                    pagination: {
                        limit: 30,
                        offset: 0,
                    },
                });

                if (!choices || !choices.length || !Array.isArray(choices)) return;

                const newChoices: CoursesLocationChoiceTypes[] = choices.map((e) => {
                    return {
                        value: getLabel(e, optionLabelKey, limitChipText === "Ellipsis"),
                        ...e,
                    };
                });

                if (!unMountedRef.current) setData(newChoices);
            } catch (err) {
                window.warner?.log("UseFetchAutocomplete", err);
                if (!unMountedRef.current) {
                    showSnackbar(t(`ra.message.unableToLoadData`), "error");
                }
            } finally {
                if (!unMountedRef.current) setLoading(false);
            }
        })();
    }, [t, inputVal, optionLabelKey, locationIds, limitChipText, showSnackbar]);

    return {
        options: data,
        setInputValDebounced,
        loading,
    };
};

export default useFetchCourseAutocomplete;
