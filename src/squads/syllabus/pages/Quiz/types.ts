export interface ExternalIdProps {
    editExternalIdDisabled?: boolean;
    externalIdError?: string;
    checkExternalId?: (externalId: string) => Promise<boolean>;
}
