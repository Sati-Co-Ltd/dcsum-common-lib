export interface FlowStatusResponse {
    id: string;
    flowName: string;
    code: string;
    order: number;
    isActive?: boolean;
    /** True when this flow_status is referenced by at least one non-deleted KPI set. */
    isUsedInKpi?: boolean;
}

export interface FlowStatusCreatePayload {
    flowName: string;
    code: string;
    order: number;
    isActive?: boolean;
}
