export interface ScanDocumentByManualDto {
    id: string;
    url: string;
    label: string | null;
    isActive: boolean;
    pathParams: string[] | null;
    queryParams: string[] | null;
}
