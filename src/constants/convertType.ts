import { DiagnosisProcedureType, type diagType, type MedicalSectionKey } from "../dto/dischargeSummary";

export const DiagnosisProcedureTypeConvertToDiagType: Record<DiagnosisProcedureType, diagType> = {
    [DiagnosisProcedureType.Principal]: "principal",
    [DiagnosisProcedureType.Comorbidity]: "comorbidity",
    [DiagnosisProcedureType.Complication]: "complication",
    [DiagnosisProcedureType.OtherDiagnosis]: "other",
    [DiagnosisProcedureType.ExternalCause]: "externalCause",
    [DiagnosisProcedureType.Operation]: "operation",
    [DiagnosisProcedureType.ImportantNonOperation]: "importantNonOperation",
    [DiagnosisProcedureType.SpecialInvestigation]: "specialInvestigation",
    [DiagnosisProcedureType.OtherProcedure]: "otherProcedure",
    [DiagnosisProcedureType.OtherNonOperation]: "otherProcedure"
};

export const DiagnosisProcedureTypeConvertToMedicalSectionKey: Record<DiagnosisProcedureType, MedicalSectionKey> = {
    [DiagnosisProcedureType.Principal]: "principalDiagnosis",
    [DiagnosisProcedureType.Comorbidity]: "comorbidity",
    [DiagnosisProcedureType.Complication]: "complication",
    [DiagnosisProcedureType.OtherDiagnosis]: "otherDiagnosis",
    [DiagnosisProcedureType.ExternalCause]: "externalCauseOfInjury",
    [DiagnosisProcedureType.Operation]: "operation",
    [DiagnosisProcedureType.ImportantNonOperation]: "importantNonOperation",
    [DiagnosisProcedureType.SpecialInvestigation]: "specialInvestigation",
    [DiagnosisProcedureType.OtherProcedure]: "otherProcedure",
    [DiagnosisProcedureType.OtherNonOperation]: "otherProcedure"
};
