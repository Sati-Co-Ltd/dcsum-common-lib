import type { HealthCareCoverageDto } from "../healthCareCoverage/healthCareCoverage.dto";
import type { FlowStatusResponse } from "./flowStatus.dto";

interface Patient {
    hospitalNumber: string;
    identifier: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

export interface DischargeSummaryListResponse {
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
}
