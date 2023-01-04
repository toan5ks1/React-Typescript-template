import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { formatDate, getDayOfWeekName } from "src/squads/lesson/common/utils";
import { Lesson_SchedulerBySchedulerIdQuery } from "src/squads/lesson/service/bob/bob-types";

import { Box, Grid } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { SavingOptionType } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface DetailSectionLessonRecurringProps {
    scheduler: ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]> | undefined;
    isLoadingScheduler: boolean;
}

const DetailSectionLessonRecurring = (props: DetailSectionLessonRecurringProps) => {
    const { scheduler, isLoadingScheduler } = props;
    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    if (isLoadingScheduler) return <CircularProgressBase />;

    if (!scheduler)
        return <TypographyBase>{tLessonManagement("errors.unableToFetchSchedule")}</TypographyBase>;

    const isWeeklyRecurring = scheduler.freq === SavingOptionType.weekly;
    const savingOption = isWeeklyRecurring
        ? tLessonManagement("recurringLesson.weeklyRecurring")
        : tLessonManagement("recurringLesson.oneTime");

    const dayOfWeek = getDayOfWeekName(new Date(scheduler.start_date), t);
    const endDate = formatDate(scheduler.end_date, "yyyy/LL/dd");
    const repeatDuration = tLessonManagement("recurringLesson.repeatDurationTime", {
        dayOfWeek,
        endDate,
    });

    return (
        <Box data-testid="DetailSectionLessonRecurring__root">
            <Box mb={2}>
                <TypographyBase variant="subtitle1">
                    {tLessonManagement("recurringLesson.recurringSettings")}
                </TypographyBase>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TypographyWithValue
                        variant="horizontal"
                        value={savingOption}
                        label={tLessonManagement("recurringLesson.savingOption")}
                        isLoading={isLoadingScheduler}
                        dataTestidValue="DetailSectionLessonRecurring__savingOption"
                    />
                </Grid>
                {isWeeklyRecurring ? (
                    <Grid item xs={6}>
                        <TypographyWithValue
                            variant="horizontal"
                            value={repeatDuration}
                            label={tLessonManagement("recurringLesson.repeatDuration")}
                            isLoading={isLoadingScheduler}
                            dataTestidValue="DetailSectionLessonRecurring__repeatDuration"
                        />
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
};

export default DetailSectionLessonRecurring;
