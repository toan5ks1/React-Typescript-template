import { Entities, EurekaEntities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";

import { IAppResource } from "../../models/resource";

const Book: IAppResource = {
    name: Entities.BOOKS,
    key: Entities.BOOKS,
    translateKey: "name",
    icon: ChromeReaderModeOutlinedIcon,
    activePaths: [
        Entities.BOOKS,
        Entities.TOPICS,
        Entities.LOS,
        EurekaEntities.ASSIGNMENTS,
        EurekaEntities.TASK_ASSIGNMENTS,
    ],
    basename: `/${MicroFrontendTypes.SYLLABUS}`,
};

export default Book;
