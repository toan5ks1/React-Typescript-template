import { Entities, EurekaEntities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

import { IAppResource } from "../../models/resource";

const Course: IAppResource = {
    key: Entities.COURSES,
    name: Entities.COURSES,
    translateKey: "name",
    icon: LibraryBooksOutlinedIcon,
    activePaths: [Entities.COURSES, EurekaEntities.STUDY_PLANS],
    basename: `/${MicroFrontendTypes.SYLLABUS}`,
};

export default Course;
