import { useCallback, useState } from "react";

import clsx from "clsx";
import { useDispatch } from "react-redux";
import { NsQuizAction, QuizActions } from "src/squads/syllabus/store/quiz";

import { Box, Paper, PaperProps } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import BaseBox from "src/squads/syllabus/components/BaseBox";
import CloseIcon from "src/squads/syllabus/components/SvgIcons/CloseIcon";
import LanguageSelect from "src/squads/syllabus/pages/Quiz/components/Selects/LanguageSelect";

import PdfView from "../PdfView";

import useLocale from "src/squads/syllabus/hooks/useLocale";
import useTextCapitalize from "src/squads/syllabus/hooks/useTextCapitalize";
import useTextEntity from "src/squads/syllabus/hooks/useTextEntity";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { LanguageEnums } from "src/squads/syllabus/typings/i18n-provider";

export type ClassKeys = "content" | "title";

export interface QuizPdfProps extends Omit<PaperProps, "classes"> {
    classes?: {
        [x in ClassKeys]?: string;
    };
    pdfUrl: string;
    disabled?: boolean;
    dispatch: ReturnType<typeof useDispatch>;
}

const QuizPdf = (props: QuizPdfProps) => {
    const t = useTranslate();
    const locale = useLocale();
    const [language, setLanguage] = useState<string>(locale);
    const [pdfLoaded, setPdfLoaded] = useState(false);

    const { textEntity, actionWrapper, actionPanel } = useTextEntity;
    const {
        className,
        dispatch,
        disabled,
        pdfUrl,
        classes: overrideClasses = {} as {
            [x in ClassKeys]?: string;
        },
        ...rest
    } = props;

    const onPDFLoaded = useCallback(() => {
        setPdfLoaded(true);
    }, []);

    const onRemoveMaterial = useCallback(() => {
        dispatch(QuizActions.setPdfUrl({ url: null }));
    }, [dispatch]);

    const onRequestOCR = useCallback(
        (params: Omit<NsQuizAction.PostORCRequest["payload"], "language">) => {
            dispatch(QuizActions.sendOrcRequest({ ...params, language }));
        },
        [dispatch, language]
    );

    return (
        <BaseBox>
            <Paper className={className} elevation={1} {...rest}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                    <Box className={clsx(overrideClasses.title, actionWrapper)} flex={1}>
                        <TypographyBase
                            variant="h4"
                            color="textPrimary"
                            className={clsx(textEntity)}
                            sx={useTextCapitalize}
                        >
                            {t("resources.common.material")}
                        </TypographyBase>
                    </Box>
                    <Box sx={actionPanel}>
                        <LanguageSelect
                            size="small"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as LanguageEnums)}
                        />
                        <Box flexShrink={0}>
                            <ButtonBase
                                disabled={disabled || !pdfLoaded}
                                startIcon={<CloseIcon />}
                                onClick={onRemoveMaterial}
                            >
                                {t(`resources.common.removeMaterial`)}
                            </ButtonBase>
                        </Box>
                    </Box>
                </Box>
                <PdfView
                    key={pdfUrl}
                    className={overrideClasses.content}
                    pdfURL={pdfUrl}
                    data-testid="PDF__view"
                    onPDFLoaded={onPDFLoaded}
                    onRequestOCR={onRequestOCR}
                />
            </Paper>
        </BaseBox>
    );
};

export default QuizPdf;
