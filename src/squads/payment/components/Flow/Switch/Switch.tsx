import { Children, isValidElement, PropsWithChildren, ReactElement, useMemo } from "react";

type EvalConditions = [number, unknown?, CaseProps<unknown>?];

interface SwitchProps {
    fallback?: JSX.Element | null;
}

// TODO:[LT-22123] simplify this component to ez to understand
export default function Switch({
    fallback = null,
    children,
}: PropsWithChildren<SwitchProps>): JSX.Element | null {
    const [index, condition, matchProps] = useMemo<EvalConditions>(() => {
        const childrens = Children.toArray(children) as ReactElement<CaseProps<unknown>>[];

        for (let index = 0; index < childrens.length; index++) {
            const matchEl = childrens[index];

            const condition = matchEl.props.when;

            if (isValidElement(matchEl) && condition) return [index, condition, matchEl.props];
        }

        return [-1];
    }, [children]);

    return useMemo<JSX.Element | null>(() => {
        if (index < 0 || !matchProps) return fallback;

        const { children } = matchProps;

        return typeof children === "function" ? children(condition) : children;
    }, [index, fallback, matchProps, condition]);
}

type CaseProps<T> = {
    when: T | undefined | null | false;
    children: JSX.Element | ((item: NonNullable<T>) => JSX.Element);
};

Switch.Case = <T,>(props: CaseProps<T>) => {
    return props as unknown as JSX.Element;
};

export type { SwitchProps, CaseProps };
