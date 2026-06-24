import type { StaffDto } from "../dischargeSummary/assignee.dto";
import type { HealthCareCoverageDto } from "../healthCareCoverage/healthCareCoverage.dto";
import type { OperatorCode } from "../operator.dto";
import type { FlowStatusResponse } from "./flowStatus.dto";

interface Patient {
    hospitalNumber: string;
    identifier: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

export type KpiItemStatus = "NORMAL" | "WARNING" | "EXCEEDED" | "NEVER_ENTERED";

export interface KpiColumnItem {
    flowStatusId: string;
    flowName: string;
    order: number;
    /** KPI threshold in whole days. */
    thresholdDays: number;
    /** Accumulated time in this flow_status floored to whole days; null = never entered ("-"). */
    durationDays: number | null;
    status: KpiItemStatus;
}

export interface KpiColumn {
    kpiSetId: string;
    kpiSetName: string;
    warningThresholdPercent: number;
    items: KpiColumnItem[];
}

export interface KpiSummaryResponse {
    /** Sum of per-encounter whole-day KPI durations across qualifying encounters. null when none. */
    totalDays: number | null;
    /**
     * Average KPI duration per qualifying encounter, in whole days (truncated, no
     * rounding). Each flow_status duration is floored to whole days before summing.
     */
    averageDays: number | null;
    /** Encounters with at least one KPI flow_status at/over its threshold. */
    overdueCount: number;
    /** Encounters with KPI data within the filter (the average's denominator). */
    encounterCount: number;
}

export interface DischargeSummaryListResponse {
    id: string;
    transactionNumber: string;
    admissionNumber: string;
    date: string;
    dischargeDate: string;
    dischargeStatus: string;
    dischargeType: string;
    correctiveData: any[];
    patient: Patient;
    flowStatus?: FlowStatusResponse | null;
    ward?: string | null;
    healthCareCoverages?: HealthCareCoverageDto | null;
    encounterAssignment?: DSListEncounterAssignment | null;
    updatedAt: string;
    pendingDays?: number | null;
    kpiStatus?: "normal" | "warning" | "complete";
    /** KPI breakdown for the matched KPI set; null when no KPI set applies. */
    kpi?: KpiColumn | null;
}

export interface DischargeSummaryListTotal {
    myWork: number;
    all: number;
}

export interface DSListEncounterAssignment {
    members: DSListEncounterAssignmentMember[];
}

export interface DSListEncounterAssignmentMember {
    roleId: string;
    staff: StaffDto | null;
}

export type DSListAssigneeQuery = {
    roleId: string;
    staffId: string;
};

export type DischargeSummaryListQuery = {
    take?: number;
    skip?: number;
    search?: string;
    from?: string;
    to?: string;
    mode?: string;
    sortBy: string | null;
    orderBy: "asc" | "desc";
    ward?: string;
    assignee?: DSListAssigneeQuery[];
    status?: string;
    kpiDurationOperator?: OperatorCode;
    kpiDurationDays?: number | null;
};
