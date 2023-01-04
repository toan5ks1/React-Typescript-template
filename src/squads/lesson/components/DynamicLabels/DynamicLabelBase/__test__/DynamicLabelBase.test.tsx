import { LabelComponentType } from "src/squads/lesson/common/constants";

import DynamicLabelBase, {
    DynamicLabelBaseProps,
} from "src/squads/lesson/components/DynamicLabels/DynamicLabelBase";

import { render, screen } from "@testing-library/react";
import useLocale from "src/squads/lesson/hooks/useLocale";
import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

jest.mock("src/squads/lesson/hooks/useLocale", () => jest.fn());

const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

const mockDynamicSections = lessonReports[0].partner_form_config?.form_config_data.sections;
describe("<DynamicLabelBase /> component with component type is TYPOGRAPHY_WITH_VALUE", () => {
    mockLanguageMode(LanguageEnums.EN);
    const props: DynamicLabelBaseProps = {
        field: mockDynamicSections[1].fields[1],
        labelComponentType: LabelComponentType["TYPOGRAPHY_WITH_VALUE"],
        dynamicData: [
            {
                field_id: mockDynamicSections[1].fields[1].field_id,
                value: "attend",
            },
        ],
    };

    render(<DynamicLabelBase {...props} />);

    it("should render label value correctly", () => {
        expect(screen.getByText("attend")).toBeInTheDocument();
        const fieldLabel = screen.getByText(`${props.field.label?.i18n.translations.en}`);
        expect(fieldLabel).toBeInTheDocument();
    });
});

describe("<DynamicLabelBase /> component with component type is TYPOGRAPHY should render title correctly", () => {
    mockLanguageMode(LanguageEnums.EN);
    const props: DynamicLabelBaseProps = {
        field: mockDynamicSections[1].fields[0],
        labelComponentType: LabelComponentType["TYPOGRAPHY"],
        dynamicData: [
            {
                field_id: "attendance_status",
                value: "good",
            },
        ],
    };
    render(<DynamicLabelBase {...props} />);
    expect(screen.getByText(`${props.field.label?.i18n.translations.en}`)).toBeInTheDocument();
});

describe("<DynamicLabelBase /> component with component type is TYPOGRAPHY_WITH_VALUE_PERCENTAGE should render label value correctly", () => {
    mockLanguageMode(LanguageEnums.EN);
    const props: DynamicLabelBaseProps = {
        field: mockDynamicSections[1].fields[2],
        labelComponentType: LabelComponentType["TYPOGRAPHY_WITH_VALUE_PERCENTAGE"],
        dynamicData: [
            {
                field_id: mockDynamicSections[1].fields[2].field_id,
                value: 100,
            },
        ],
    };

    render(<DynamicLabelBase {...props} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText(`${props.field.label?.i18n.translations.en}`)).toBeInTheDocument();
});
