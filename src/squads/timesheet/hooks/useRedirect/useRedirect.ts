import { useHistory } from "react-router";

const useRedirect = () => {
    const history = useHistory();
    return history;
};

export default useRedirect;
