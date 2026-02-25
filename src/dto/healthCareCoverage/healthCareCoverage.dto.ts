export interface HealthCareCoverageDto {
    id: string;
    code: string;
    description: string;
    abbreviation: string;
    group?: string | null;
    expireDate?: string;
    icd?: Icds | null;
    drg?: Drgs | null;
    multiplier?: number;
    roomPrice?: number;
}

export enum Icds {
    WHO2010 = "ICD10-WHO-2010",
    WHO2016 = "ICD10-WHO-2016"
}

export enum Drgs {
    TGRP5103 = "5.103",
    TGrp6205 = "6.205",
    TGrp6305 = "6.305"
}
