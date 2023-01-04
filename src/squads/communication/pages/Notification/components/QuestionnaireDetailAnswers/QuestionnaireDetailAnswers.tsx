import { ReactNode } from "react";

import { arrayHasItem } from "src/common/utils/other";

import { Grid } from "@mui/material";
import TypographyWordBreak from "src/squads/communication/pages/Notification/components/TypographyWordBreak";

export interface QuestionnaireDetailAnswersProps {
    choicesList: ReactNode[];
}

const QuestionnaireDetailAnswers = ({ choicesList }: QuestionnaireDetailAnswersProps) => {
    return (
        <Grid
            data-testid="QuestionnaireDetailAnswers__root"
            container
            spacing={1}
            marginTop={0} // marginTop with question's name
        >
            {arrayHasItem(choicesList)
                ? choicesList.map((answer, index) => (
                      <Grid item xs={12} key={`${answer}-${index}`}>
                          <TypographyWordBreak
                              data-testid="QuestionnaireDetailAnswers__answer"
                              isTextInAccordion
                              variant="caption"
                          >
                              {answer}
                          </TypographyWordBreak>
                      </Grid>
                  ))
                : null}
        </Grid>
    );
};

export default QuestionnaireDetailAnswers;
