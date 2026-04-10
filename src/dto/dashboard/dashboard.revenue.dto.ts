export type FinancialRevenueCycleRole = "auditDoctor" | "doctor" | "auditStaff" | "coder" | "import" | "user" | "unknown";
export type FinancialRevenueCycleTimeGrouping =
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year"
    | "decade"
    | "century"
    | "millennium";

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
    encounterCount: number;
    editCount: number;
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
    stddevDuration: number | null;
    avgDoctorAdjRwDiff: number | null;
    stddevDoctorAdjRwDiff: number | null;
    avgCoderAdjRwDiff: number | null;
    stddevCoderAdjRwDiff: number | null;
    avgDoctorAdjRw: number | null;
    stddevDoctorAdjRw: number | null;
    avgCoderAdjRw: number | null;
    stddevCoderAdjRw: number | null;
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
    stddevFirstDuration: number | null;
    avgFirstDoctorAdjRwDiff: number | null;
    stddevFirstDoctorAdjRwDiff: number | null;
    avgFirstCoderAdjRwDiff: number | null;
    stddevFirstCoderAdjRwDiff: number | null;
    avgFirstDoctorAdjRw: number | null;
    stddevFirstDoctorAdjRw: number | null;
    avgFirstCoderAdjRw: number | null;
    stddevFirstCoderAdjRw: number | null;
}

export interface FinancialRevenueCycleLagToLeadRoleReturnRow extends FinancialRevenueCycleCommonReturnRow {
    lagRole: string | null;
    leadRole: string;
    roleEditSequence: number;
}

export interface FinancialRevenueCycleRoleEditSequenceReturnRow extends FinancialRevenueCycleCommonReturnRow {
    roleEditSequence: number;
}

export interface FinancialRevenueCycleRoleOnlyReturnRow
    extends FinancialRevenueCycleCommonReturnRow, FinancialRevenueCycleFirstPassReturnRow {}

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

export type StaffPendingSummaryFilter = {
    startDate?: Date;
    endDate?: Date;
    kpiDays?: number | null;
    referenceDate?: Date;
};

export type StaffPendingSummaryBucket = {
    caseCount: number;
    overKpiCaseCount: number;
    withinKpiCaseCount: number;
    sumAdjRw: number;
    sumEstimatedPay: number;
    sumCost: number;
    sumWaitingDaysOverKpi: number;
    sumWaitingDaysWithinKpi: number;
    maxWaitingDays: number;
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

export type StaffPendingSummaryResponse = {
    kpiDays: number;
    asOf: Date;
    totalDoctors: number;
    doctors: StaffPendingSummaryDoctorRow[];
    summary: {
        notFinished: StaffPendingSummaryBucket;
        notStarted: StaffPendingSummaryBucket;
    };
};