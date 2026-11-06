export type ClinicalSummaryDisplayMode = "priority" | "draft" | "all" | "only";

export type ClinicalSummaryDto = {
    id?: string;
    source: "IMPORT" | "AI" | "USER" | "DRAFT";
    isFinal: boolean;
    finalDiagnosis: string | null;
    progression: string | null;
    followUp: string | null;
    recorder: string;
    createdAt: string; // or Date if it's parsed
    updatedAt: string; // or Date if it's parsed
    encounterId: string;
};
