export enum DiagnosisProcedureType {
    Principal = "Principal",
    Comorbidity = "Comorbidity",
    Complication = "Complication",
    OtherDiagnosis = "OtherDiagnosis",
    ExternalCause = "ExternalCause",
    Operation = "Operation",
    ImportantNonOperation = "ImportantNonOperation",
    SpecialInvestigation = "SpecialInvestigation",
    OtherProcedure = "OtherProcedure",
    OtherNonOperation = "OtherNonOperation"
}

export type DiagnosisSectionKey =
    | "principalDiagnosis"
    | "comorbidity"
    | "complication"
    | "otherDiagnosis"
    | "externalCauseOfInjury";

export type ProcedureSectionKey = "operation" | "importantNonOperation" | "specialInvestigation" | "otherProcedure";

export type MedicalSectionKey = DiagnosisSectionKey | ProcedureSectionKey;
export * from "./auditorSuggestion.dto";

export type diagType =
    | "principal"
    | "comorbidity"
    | "complication"
    | "other"
    | "externalCause"
    | "operation"
    | "importantNonOperation"
    | "specialInvestigation"
    | "otherProcedure"
    | "Operation"
    | "Other Non-Operation"
    | "Important Non-Operation"
    | "Special Investigation";
