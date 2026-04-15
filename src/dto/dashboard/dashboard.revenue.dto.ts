export type FinancialRevenueCycleRole =
    | "auditDoctor"
    | "doctor"
    | "auditStaff"
    | "coder"
    | "import"
    | "user"
    | "unknown";
export type FinancialRevenueCycleTimeGrouping =
    | ""
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year"
    | "decade"
    | "century"
    | "millennium";

export const financialRevenueCycleTimeGroupings: FinancialRevenueCycleTimeGrouping[] = [
    "",
    "hour",
    "day",
    "week",
    "month",
    "quarter",
    "year",
    "decade",
    "century",
    "millennium"
];

export interface FinancialRevenueCycleFilter {
    startDate: Date;
    endDate: Date;
    crossTenant?: boolean;
    timeGrouping?: FinancialRevenueCycleTimeGrouping;
}

export interface FinancialRevenueCycleCommonReturnRow {
    role: FinancialRevenueCycleRole;
    tenantIdentifierId: string | null;
    timeGroup: Date | string;
    encounterCount: bigint;
    editCount: bigint;
    totalDuration: number | null;
    durationSquareSum: number | null;
    totalDoctorAdjRwDiff: number | null;
    doctorAdjRwDiffSquareSum: number | null;
    totalCoderAdjRwDiff: number | null;
    coderAdjRwDiffSquareSum: number | null;
    totalDoctorAdjRw: number | null;
    doctorAdjRwSquareSum: number | null;
    totalCoderAdjRw: number | null;
    coderAdjRwSquareSum: number | null;
    hasEdit: boolean;
    avgDuration: number | null;
    semDuration: number | null;
    avgDoctorAdjRwDiff: number | null;
    semDoctorAdjRwDiff: number | null;
    avgCoderAdjRwDiff: number | null;
    semCoderAdjRwDiff: number | null;
    avgDoctorAdjRw: number | null;
    semDoctorAdjRw: number | null;
    avgCoderAdjRw: number | null;
    semCoderAdjRw: number | null;
}

export interface FinancialRevenueCycleFirstPassReturnRow {
    totalFirstDuration: number | null;
    firstDurationSquareSum: number | null;
    totalFirstDoctorAdjRwDiff: number | null;
    firstDoctorAdjRwDiffSquareSum: number | null;
    totalFirstCoderAdjRwDiff: number | null;
    firstCoderAdjRwDiffSquareSum: number | null;
    totalFirstDoctorAdjRw: number | null;
    firstDoctorAdjRwSquareSum: number | null;
    totalFirstCoderAdjRw: number | null;
    firstCoderAdjRwSquareSum: number | null;
    avgFirstDuration: number | null;
    semFirstDuration: number | null;
    avgFirstDoctorAdjRwDiff: number | null;
    semFirstDoctorAdjRwDiff: number | null;
    avgFirstCoderAdjRwDiff: number | null;
    semFirstCoderAdjRwDiff: number | null;
    avgFirstDoctorAdjRw: number | null;
    semFirstDoctorAdjRw: number | null;
    avgFirstCoderAdjRw: number | null;
    semFirstCoderAdjRw: number | null;
}

export interface FinancialRevenueCycleLagToLeadRoleReturnRow extends FinancialRevenueCycleCommonReturnRow {
    lagRole: string | null;
    leadRole: string;
    roleEditSequence: bigint;
}

export interface FinancialRevenueCycleRoleEditSequenceReturnRow extends FinancialRevenueCycleCommonReturnRow {
    roleEditSequence: bigint;
}

export interface FinancialRevenueCycleRoleOnlyReturnRow
    extends FinancialRevenueCycleCommonReturnRow,
        FinancialRevenueCycleFirstPassReturnRow {}

export interface FinancialRevenueCycleTenantInfo {
    name: string;
    subDomain: string;
    hospitalCode: string;
    hospitalOfficialName: string;
}

export interface FinancialRevenueCycleOutput {
    lagToLeadRole: FinancialRevenueCycleLagToLeadRoleReturnRow[];
    roleEditSequence: FinancialRevenueCycleRoleEditSequenceReturnRow[];
    roleOnly: FinancialRevenueCycleRoleOnlyReturnRow[];
    tenant?: FinancialRevenueCycleTenantInfo;
}

export interface PreAuditAdjRwReturnRow {
    mode: "per_tenant" | "overall";
    tenantIdentifierId: string | null;
    timeGroup: Date | string;
    totalAuditedPreAuditAdjustRw: number | null;
    auditedPreAuditAdjustRwSquareSum: number | null;
    countAuditedPreAuditAdjustRw: bigint;
    totalAuditedEstimatedIncome: number | null;
    auditedEstimatedIncomeSquareSum: number | null;
    countAuditedEstimatedIncome: bigint;
    totalImprovedPreAuditAdjustRw: number | null;
    improvedPreAuditAdjustRwSquareSum: number | null;
    countImprovedPreAuditAdjustRw: bigint;
    totalImprovedEstimatedIncome: number | null;
    improvedEstimatedIncomeSquareSum: number | null;
    countImprovedEstimatedIncome: bigint;
    totalAdjustedRw: number | null;
    adjustedRwSquareSum: number | null;
    countAdjustedRw: bigint;
    avgAuditedPreAuditAdjustRw: number | null;
    semAuditedPreAuditAdjustRw: number | null;
    avgAuditedEstimatedIncome: number | null;
    semAuditedEstimatedIncome: number | null;
    avgImprovedPreAuditAdjustRw: number | null;
    semImprovedPreAuditAdjustRw: number | null;
    avgImprovedEstimatedIncome: number | null;
    semImprovedEstimatedIncome: number | null;
    avgAdjustedRw: number | null;
    semAdjustedRw: number | null;
}

export interface PreAuditAdjRwOutput {
    preAuditAdjRw: PreAuditAdjRwReturnRow[];
    tenant?: FinancialRevenueCycleTenantInfo;
}

export type PreAuditAdjRwFinancialRevenueCycleOutput = FinancialRevenueCycleOutput & PreAuditAdjRwOutput;

// Serialized variants: BigInt count/sequence fields are mapped to number | string for JSON responses

export interface FinancialRevenueCycleCommonReturnRowSerialized
    extends Omit<FinancialRevenueCycleCommonReturnRow, "encounterCount" | "editCount"> {
    encounterCount: number | string;
    editCount: number | string;
}

export interface FinancialRevenueCycleLagToLeadRoleReturnRowSerialized
    extends Omit<FinancialRevenueCycleLagToLeadRoleReturnRow, "encounterCount" | "editCount" | "roleEditSequence"> {
    encounterCount: number | string;
    editCount: number | string;
    roleEditSequence: number | string;
}

export interface FinancialRevenueCycleRoleEditSequenceReturnRowSerialized
    extends Omit<FinancialRevenueCycleRoleEditSequenceReturnRow, "encounterCount" | "editCount" | "roleEditSequence"> {
    encounterCount: number | string;
    editCount: number | string;
    roleEditSequence: number | string;
}

export interface FinancialRevenueCycleRoleOnlyReturnRowSerialized
    extends FinancialRevenueCycleCommonReturnRowSerialized,
        FinancialRevenueCycleFirstPassReturnRow {}

export interface FinancialRevenueCycleOutputSerialized {
    lagToLeadRole: FinancialRevenueCycleLagToLeadRoleReturnRowSerialized[];
    roleEditSequence: FinancialRevenueCycleRoleEditSequenceReturnRowSerialized[];
    roleOnly: FinancialRevenueCycleRoleOnlyReturnRowSerialized[];
    tenant?: FinancialRevenueCycleTenantInfo;
}

export interface PreAuditAdjRwReturnRowSerialized
    extends Omit<
        PreAuditAdjRwReturnRow,
        | "countAuditedPreAuditAdjustRw"
        | "countAuditedEstimatedIncome"
        | "countImprovedPreAuditAdjustRw"
        | "countImprovedEstimatedIncome"
        | "countAdjustedRw"
    > {
    countAuditedPreAuditAdjustRw: number | string;
    countAuditedEstimatedIncome: number | string;
    countImprovedPreAuditAdjustRw: number | string;
    countImprovedEstimatedIncome: number | string;
    countAdjustedRw: number | string;
}

export interface PreAuditAdjRwOutputSerialized {
    preAuditAdjRw: PreAuditAdjRwReturnRowSerialized[];
    tenant?: FinancialRevenueCycleTenantInfo;
}

export type PreAuditAdjRwFinancialRevenueCycleOutputSerialized = FinancialRevenueCycleOutputSerialized &
    PreAuditAdjRwOutputSerialized;

export type StaffPendingSummaryFilter = {
    startDate?: Date;
    endDate?: Date;
    kpiDays?: number | null;
    referenceDate?: Date;
    crossTenant?: boolean;
};

export type StaffPendingSummaryBucket = {
    caseCount: number | bigint;
    overKpiCaseCount: number | bigint;
    withinKpiCaseCount: number | bigint;
    sumAdjRw: number;
    sumEstimatedPay: number;
    sumCost: number;
    sumWaitingDaysOverKpi: number;
    sumWaitingDaysWithinKpi: number;
    maxWaitingDays: number;
};

export type StaffPendingSummaryBucketSerialized = Omit<
    StaffPendingSummaryBucket,
    "caseCount" | "overKpiCaseCount" | "withinKpiCaseCount"
> & {
    caseCount: number | string;
    overKpiCaseCount: number | string;
    withinKpiCaseCount: number | string;
};

export type StaffPendingSummaryBucketKey = "notFinished" | "notStarted";

export type StaffPendingSummaryDoctorRow = {
    doctorKey: string;
    doctorId: string | null;
    doctorHisId: string | null;
    doctorLicense: string | null;
    doctorName: string;
    kpiDays: number;
    notFinished: StaffPendingSummaryBucket;
    notStarted: StaffPendingSummaryBucket;
};

export type StaffPendingSummaryDoctorRowSerialized = Omit<
    StaffPendingSummaryDoctorRow,
    "notFinished" | "notStarted"
> & {
    notFinished: StaffPendingSummaryBucketSerialized;
    notStarted: StaffPendingSummaryBucketSerialized;
};

export type StaffPendingSummaryResponse = {
    tenantIdentifierId: string | null;
    tenant?: FinancialRevenueCycleTenantInfo;
    kpiDays: number;
    asOf: Date;
    totalDoctors: number;
    doctors: StaffPendingSummaryDoctorRow[];
    summary: {
        notFinished: StaffPendingSummaryBucket;
        notStarted: StaffPendingSummaryBucket;
    };
};

export type StaffPendingSummaryResponseSerialized = Omit<StaffPendingSummaryResponse, "doctors" | "summary"> & {
    doctors: StaffPendingSummaryDoctorRowSerialized[];
    summary: {
        notFinished: StaffPendingSummaryBucketSerialized;
        notStarted: StaffPendingSummaryBucketSerialized;
    };
};

// ---------------------------------------------------------------------------
// User Revenue Cycle (group-by-user variant with KPI buckets)
// ---------------------------------------------------------------------------

export type UserRevenueCycleKpiBucket = "within" | "over" | "all";

export type UserRevenueCycleFilter = FinancialRevenueCycleFilter & {
    kpiDays?: number | null;
};

export interface UserRevenueCycleRow {
    userId: string | null;
    username: string | null;
    userHisId: string | null;
    userLicenseNumber: string | null;
    role: FinancialRevenueCycleRole;
    tenantIdentifierId: string | null;
    timeGroup: Date | string;
    kpiBucket: UserRevenueCycleKpiBucket;
    encounterCount: number;
    editCount: number;
    totalDuration: number | null;
    durationSquareSum: number | null;
    avgDuration: number | null;
    semDuration: number | null;
    totalDoctorAdjRwDiff: number | null;
    doctorAdjRwDiffSquareSum: number | null;
    avgDoctorAdjRwDiff: number | null;
    semDoctorAdjRwDiff: number | null;
    totalCoderAdjRwDiff: number | null;
    coderAdjRwDiffSquareSum: number | null;
    avgCoderAdjRwDiff: number | null;
    semCoderAdjRwDiff: number | null;
    totalDoctorAdjRw: number | null;
    doctorAdjRwSquareSum: number | null;
    avgDoctorAdjRw: number | null;
    semDoctorAdjRw: number | null;
    totalCoderAdjRw: number | null;
    coderAdjRwSquareSum: number | null;
    avgCoderAdjRw: number | null;
    semCoderAdjRw: number | null;
}

export interface UserRevenueCycleOutput {
    kpiDays: number;
    rows: UserRevenueCycleRow[];
    tenant?: FinancialRevenueCycleTenantInfo;
}
