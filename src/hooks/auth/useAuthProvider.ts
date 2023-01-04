import { AuthProviderType } from "src/typings/auth-provider";

import authProvider from "../../internals/auth-provider";

function useAuthProvider(): AuthProviderType {
    return authProvider;
}

export default useAuthProvider;
