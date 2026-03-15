export interface FlowStatusResponse {
    id: string;
    flowName: string;
    code: string;
    order: number;
    isActive?: boolean;
}
