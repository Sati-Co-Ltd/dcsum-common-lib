import type { StaffDto } from "../dischargeSummary/assignee.dto";
import type { HealthCareCoverageDto } from "../healthCareCoverage/healthCareCoverage.dto";
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
    thresholdMinutes: number;
    /** Accumulated time spent in this flow_status; null = never entered ("-"). */
    durationMinutes: number | null;
    status: KpiItemStatus;
}

export interface KpiColumn {
    kpiSetId: string;
    kpiSetName: string;
    warningThresholdPercent: number;
    items: KpiColumnItem[];
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
