type FinancialRevenueCycleRole = "auditDoctor" | "doctor" | "auditStaff" | "coder" | "import" | "unknown";

interface FinancialRevenueCycleCommonReturnRow {
    role: FinancialRevenueCycleRole;
    tenantIdentifierId: string;
    timeGroup: Date | string;
    encounterCount: number;
    editCount: number;
    totalDuration: string | null;
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
    avgDuration: string | null;
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

interface FinancialRevenueCycleFirstPassReturnRow {
    totalFirstDuration: string | null;
    firstDurationSquareSum: number | null;
    totalFirstDoctorAdjRwDiff: number | null;
    firstDoctorAdjRwDiffSquareSum: number | null;
    totalFirstCoderAdjRwDiff: number | null;
    firstCoderAdjRwDiffSquareSum: number | null;
    totalFirstDoctorAdjRw: number | null;
    firstDoctorAdjRwSquareSum: number | null;
    totalFirstCoderAdjRw: number | null;
    firstCoderAdjRwSquareSum: number | null;
    avgFirstDuration: string | null;
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

interface FinancialRevenueCycleLagToLeadRoleReturnRow extends FinancialRevenueCycleCommonReturnRow {
    lagRole: string | null;
    leadRole: string;
    roleEditSequence: number;
}

interface FinancialRevenueCycleRoleEditSequenceReturnRow extends FinancialRevenueCycleCommonReturnRow {
    roleEditSequence: number;
}

interface FinancialRevenueCycleRoleOnlyReturnRow
    extends FinancialRevenueCycleCommonReturnRow, FinancialRevenueCycleFirstPassReturnRow {}

interface FinancialRevenueCycleTenantInfo {
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
