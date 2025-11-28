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
}
