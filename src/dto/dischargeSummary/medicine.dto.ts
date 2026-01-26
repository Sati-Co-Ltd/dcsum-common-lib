export interface MedicineDto {
    medicineV2: MedicineItemDto[];
}

export interface MedicineItemDto {
    id?: string;
    name: string;
    tmtId?: string;
    snomedId?: string;
    note?: string;
    quantity: number;
    homeMedicationDetail?: HomeMedicationDetail | null;
}

export interface HomeMedicationDetail {
    quantity: number;
    note: string;
    direction: string;
    transform: string;
}
