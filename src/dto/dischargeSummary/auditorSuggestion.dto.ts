import type { DiagnosisProcedureType } from ".";

export interface AuditorSuggestionResponse {
    id: string;
    name: string;
    type: DiagnosisProcedureType;
    icd?: AuditorSuggestionICD[] | null;
    order?: number | null;
    gender?: AuditorSuggestionGender;
    ward?: string[] | null;
    note?: string | null;
    snomedId?: string | null;
}

export interface AuditorSuggestionICD {
    id: string;
    term?: string;
    code: string;
}

export enum AuditorSuggestionGender {
    male = "male",
    female = "female",
    both = "both"
}
