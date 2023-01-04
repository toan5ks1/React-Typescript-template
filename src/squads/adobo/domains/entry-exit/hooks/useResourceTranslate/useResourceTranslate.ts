import { useCallback } from "react";

import { TypeEntity } from "src/squads/adobo/domains/entry-exit/typings/react-admin";

import useTranslate from "src/squads/adobo/domains/entry-exit/hooks/useTranslate";

export type UseResourceTranslateReturn = (
    prop: string,
    option?:
        | {
              [x: string]: string | number | undefined;
              smart_count?: string | number | undefined;
          }
        | undefined
) => string;

/**
 * @param {string} resourceName Name of the resource
 * */
function useResourceTranslate(resourceName: TypeEntity | string): UseResourceTranslateReturn {
    const t = useTranslate();

    return useCallback(
        (
            prop: string,
            option?: { smart_count?: number | string; [x: string]: number | string | undefined }
        ) => t(`resources.${resourceName}.${prop}`, option || { smart_count: 1 }),
        [resourceName, t]
    );
}

export default useResourceTranslate;
