import createSanitizer from "../packages/sanitizer";
import warner from "./warner";

const QUIZ_DOM_OPTIONS = {
    TAGS: ["mjx-container", "use"],
    ATTR: ["ctxtmenu_counter", "focusable", "jax"],
};

const sanitizer = createSanitizer({
    DOMOptions: {
        ADD_TAGS: QUIZ_DOM_OPTIONS.TAGS,
        ADD_ATTR: QUIZ_DOM_OPTIONS.ATTR,
    },
});

sanitizer.setLogger(warner);

export default sanitizer;
