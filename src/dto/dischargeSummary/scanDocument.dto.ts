export interface ScanDocumentByManualDto {
    id: string;
    url: string;
    label: string | null;
    isActive: boolean;
    pathParams: any | null;
    queryParams: any | null;
}
