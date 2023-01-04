import { useMemo } from "react";

import { $enum } from "ts-enum-util";

import { MenuItem } from "@mui/material";

import BaseSelect, { BaseSelectProps } from "./BaseSelect";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface CreateSelectOptions {
    label?: string;
    createTranslatorKey?: (key: string | number) => string;
}

export interface SelectFromEnum<P, Override = P> extends BaseSelectProps {
    renderMenus?: (
        items: P[],
        createTranslatorKey: CreateSelectOptions["createTranslatorKey"]
    ) => JSX.Element[];
    value?: Override extends any ? Override : P;
}

export const defaultSelectOptions: CreateSelectOptions = {
    createTranslatorKey: (key) => `${key}`,
};

export function createSelectFromEnum<T extends string, TEnumValue extends string | number>(
    enumVal: { [key in T]: TEnumValue },
    options: CreateSelectOptions
) {
    const { createTranslatorKey, label } = options;
    let enumValues = $enum(enumVal).getValues();

    function Comp<Override>(props: SelectFromEnum<TEnumValue, Override>) {
        const t = useTranslate();
        const { renderMenus, ...rest } = props;

        const menuItems = useMemo(() => {
            if (typeof renderMenus === "function") {
                return renderMenus(enumValues, createTranslatorKey);
            }

            return enumValues.map((e) => {
                const translatorText = createTranslatorKey ? t(createTranslatorKey(e)) : `${e}`;

                return (
                    <MenuItem key={e} value={e}>
                        {translatorText}
                    </MenuItem>
                );
            });
        }, [t, renderMenus]);

        return (
            <BaseSelect {...rest} label={t(label as string)}>
                {menuItems}
            </BaseSelect>
        );
    }

    return Comp;
}
