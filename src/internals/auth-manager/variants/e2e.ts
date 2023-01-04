import { getOriginUrl } from "../../../common/helpers/project";
import FirebaseAuth from "../../../packages/firebase/Auth";
import firebaseApp from "../../firebase-app";

const authManager = new FirebaseAuth(firebaseApp.getInstance(), {
    redirectUrl: `${getOriginUrl().origin}/login`,
});

export default authManager;
