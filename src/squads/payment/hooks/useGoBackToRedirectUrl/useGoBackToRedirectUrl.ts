import { useHistory, useLocation } from "react-router";

const useGoBackToRedirectUrl = () => {
    const history = useHistory();
    const { search } = useLocation();

    const goBackToRedirectUrl = () => {
        const queryParams = new URLSearchParams(search);
        const redirectUrl = queryParams.get("redirectUrl");
        redirectUrl ? history.push(redirectUrl) : history.goBack();
    };

    return goBackToRedirectUrl;
};

export default useGoBackToRedirectUrl;
