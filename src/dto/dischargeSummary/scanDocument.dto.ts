export interface ScanDocumentByManualDto {
    id: string;
    url: string;
    label: string;
    isActive: boolean;
    pathParams: string[] | null;
    queryParams: string[] | null;
    isOpenNewTab: boolean;
}
