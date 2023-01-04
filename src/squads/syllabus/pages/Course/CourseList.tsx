import { Entities } from "src/common/constants/enum";

import CourseTable from "../../components/RelatedCourse/CourseTable";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";

import useTranslate from "../../hooks/useTranslate";

const List = () => {
    const t = useTranslate();

    return (
        <WrapperPageContent>
            <TypographyPageTitle
                title={t(`resources.${Entities.COURSES}.name`)}
                data-testid="CourseList__title"
            />
            <CourseTable />
        </WrapperPageContent>
    );
};

export default List;
