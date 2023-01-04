import { Suspense, useEffect, ElementType, useState } from "react";

import { useSelector } from "react-redux";
import reactiveStorage from "src/squads/user/internals/reactive-storage";
import { RootState } from "src/squads/user/stores/store-types";

import Loading from "src/components/Loading";
import AuthLayout from "src/squads/user/components/Layout/AuthLayout";

import LoginCard from "./LoginCard";

import useCheckAuth from "src/squads/user/hooks/auth/useCheckAuth";
import useLogin from "src/squads/user/hooks/auth/useLogin";
import useSubRedirect from "src/squads/user/hooks/useSubRedirect";

export interface LoginLayoutProps {
    form: ElementType<{ onLogin: (...args: any[]) => void; loading: boolean }>;
}

const LoginLayout = ({ form: Form }: LoginLayoutProps) => {
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

    const { onCheckAuth } = useCheckAuth(true);
    const { onLogin, loading } = useLogin();
    const redirectAfterLogin = useSelector((state: RootState) => state.app.redirectAfterLogin);

    const { navigateToRedirectUrl } = useSubRedirect();

    useEffect(() => {
        setLoadingAuth(true);
        onCheckAuth()
            .then(() => {
                setLoadingAuth(false);
                navigateToRedirectUrl(redirectAfterLogin);
            })
            .catch(() => {
                setLoadingAuth(false);
            });
        const unregister = reactiveStorage.registerListener(
            "TOKEN",
            (newVal) => {
                if (newVal !== null) {
                    window.location.reload();
                }
            },
            { run1st: false, crossTabs: true }
        );
        return () => {
            if (typeof unregister === "function") {
                unregister();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loadingAuth) return <Loading fullscreen />;
    return (
        <AuthLayout>
            <LoginCard
                sx={(theme) => ({
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    backgroundColor: theme.palette.other?.backgroundGrey,
                    backgroundImage: "none",
                })}
            >
                <Suspense fallback="...">
                    <Form onLogin={onLogin} loading={loading} />
                </Suspense>
            </LoginCard>
        </AuthLayout>
    );
};

export default LoginLayout;
