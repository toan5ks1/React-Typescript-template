import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";
import { QuizzesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

export const mockQuizValue: QuizzesOneQuery["quizzes"][0] = {
    approved_by: "01EM0ERM4614D2KHYM32K3RZNS",
    country: "COUNTRY_NONE",
    difficulty_level: 1,
    explanation: {
        raw: '{"blocks":[{"key":"1gs0j","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        rendered_url:
            "https://storage.googleapis.com/stag-manabie-backend/content/b03bad17f714c2483d8009a993df0049.html",
    },
    external_id: "01G8AEE9SF5EHW5J5RCPGG33MT",
    kind: "QUIZ_TYPE_MCQ",
    options: [
        {
            key: "01G8AEE9SN8VSQPQ4SA1ZJVCCM",
            label: "",
            configs: [],
            content: {
                raw: '{"blocks":[{"key":"9nmrm","text":"dsf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                rendered_url:
                    "https://storage.googleapis.com/stag-manabie-backend/content/e602c54df5f8239b3f2ef947c2cfdf33.html",
            },
            attribute: {
                configs: [],
                img_link: "",
                audio_link: "",
            },
            correctness: true,
        },
        {
            key: "01G8AEE9SQJ1YHDW87GDYXAXY6",
            label: "",
            configs: [],
            content: {
                raw: '{"blocks":[{"key":"cjkrm","text":"dasf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                rendered_url:
                    "https://storage.googleapis.com/stag-manabie-backend/content/72ccfec54af36efaf1bf4b2188d5f98f.html",
            },
            attribute: {
                configs: [],
                img_link: "",
                audio_link: "",
            },
            correctness: false,
        },
        {
            key: "01G8AEE9ST43D6K4PT46QB54Z7",
            label: "",
            configs: [],
            content: {
                raw: '{"blocks":[{"key":"35h2m","text":"dsf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                rendered_url:
                    "https://storage.googleapis.com/stag-manabie-backend/content/3df9bd6f2fc70895a7dd6a939d9045a8.html",
            },
            attribute: {
                configs: [],
                img_link: "",
                audio_link: "",
            },
            correctness: false,
        },
        {
            key: "01G8AEE9SW7WTDD2CAF8NBZJQ8",
            label: "",
            configs: [],
            content: {
                raw: '{"blocks":[{"key":"cgsqk","text":"dsf","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                rendered_url:
                    "https://storage.googleapis.com/stag-manabie-backend/content/edd5d6eb32846a4b27222a8de979e588.html",
            },
            attribute: {
                configs: [],
                img_link: "",
                audio_link: "",
            },
            correctness: false,
        },
    ],
    question: {
        raw: '{"blocks":[{"key":"as1q3","text":"Text 1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ep0jp","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"44g6f","text":"Text 2  Text 3","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":6,"length":1,"key":1},{"offset":7,"length":1,"key":2}],"data":{}},{"key":"1k8v5","text":"Text 4","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1gni6","text":"Text 5","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cui6","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":3}],"data":{}}],"entityMap":{"0":{"type":"INLINE_MATHJAX","mutability":"IMMUTABLE","data":{"data":"\\\\vec{n}=(2 ;-3 ; 4)"}},"1":{"type":"INLINE_MATHJAX","mutability":"IMMUTABLE","data":{"data":"y=-1"}},"2":{"type":"INLINE_MATHJAX","mutability":"IMMUTABLE","data":{"data":"S=(2 ;+\\\\infty)"}},"3":{"type":"INLINE_MATHJAX","mutability":"IMMUTABLE","data":{"data":"S=(-\\\\infty ; 1) ."}}}}',
        configs: null,
        attribute: {
            configs: [],
            img_link: "",
            audio_link: "",
        },
        rendered_url:
            "https://storage.googleapis.com/stag-manabie-backend/content/59406ff8370728dca67defeca804241e.html",
    },
    quiz_id: "01G8B0GCAD12DK5NPTQ3BZDHAD",
    school_id: -2147483648,
    tagged_los: ["01G8AS25QS4JAEERDYVYQ05JYC", "01G8AJED74CE63MN7GFF3Y9Z1F"],
};

export const mockLOValue: LOWithQuizSet = {
    id: "abc",
    lo_id: "abc",
    name: "ABC",
    created_at: "2022/07/19",
    school_id: 0,
    type: "LEARNING_OBJECTIVE_TYPE_EXAM_LO",
    quiz_sets: [
        {
            quiz_external_ids: ["01G8AEE9SF5EHW5J5RCPGG33MT"],
        },
    ],
};
