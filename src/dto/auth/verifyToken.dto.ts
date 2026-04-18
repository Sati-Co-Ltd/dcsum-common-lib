type OtaBmsUserInfo = {
    name: string;
    isCoder: boolean;
    isDoctor: boolean;
    userHisId: string;
    isAuditStaff: boolean;
    isAuditDoctor: boolean;
    userLicenseNumber: string;
};

export type VerifyTokenOtaBmsResponse = {
    id: string;
    firstName: string;
    lastName: string;
    license?: string;
    hisId?: string;
    roleName?: string;
    moduleAction: number[];
    roleId: string;
    type: "ota" | "bms";
    tenantIdentifierId?: string;
    hospitalNumber?: string;
    transactionNumber?: string;
    user?: OtaBmsUserInfo;
    token: string;
    ota: boolean;
    bms: boolean;
    satiEcoSystemToken?: string | null;
};

export type VerifyTokenUserResponse = {
    id: string;
    license: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    roleId: string | null;
    image: string | null;
    userId: string | null;
    hisId: string | null;
    roleName: string;
    moduleAction: number[];
    tenantIdentifierId?: string;
    token: string;
    satiEcoSystemToken?: string | null;
};

export type VerifyTokenResponse = VerifyTokenOtaBmsResponse | VerifyTokenUserResponse;
