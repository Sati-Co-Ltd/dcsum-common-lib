export interface BillingItemDto {
    id?: string;
    name: string;
    code?: string;
    cgd?: string;
    feeSchedule?: string;
    note?: string;
    quantity?: number;
    itemGroup?: string;
    snomedCT?: string | null;
    totalPrice?: number | null;
}

export interface BillingItemsDto {
    billingItem: BillingItemDto[];
}
