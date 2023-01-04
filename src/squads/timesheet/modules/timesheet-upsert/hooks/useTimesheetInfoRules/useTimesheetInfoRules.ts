import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export interface UseTimesheetInfoRulesReturn {
    required: {
        value: boolean;
        message: string;
    };
}

const useTimesheetInfoRules = (): UseTimesheetInfoRulesReturn => {
    const t = useTranslate();

    return {
        required: {
            value: true,
            message: t("resources.input.error.required"),
        },
    };
};

export default useTimesheetInfoRules;
