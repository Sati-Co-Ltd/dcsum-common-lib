import { DiagnosisProcedureType } from "../..";

export enum favoriteDxGender {
    male = "male",
    female = "female",
    both = "both"
}

export interface FavoriteDxResponse {
    id: string;
    name: string;
    type: DiagnosisProcedureType;
    icd?: FavoriteDxICD[] | null;
    order?: number | null;
    gender?: favoriteDxGender;
    ward?: string | null;
    note?: string | null;
    snomedId?: string | null;
}

export interface FavoriteDxICD {
    id: string;
    term?: string;
    code: string;
}
