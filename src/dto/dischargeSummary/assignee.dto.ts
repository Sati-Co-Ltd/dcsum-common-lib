export interface StaffDto {
    id: string;
    hisId?: string | null;
    licenseNo?: string | null;
    fullName: string | null;
}

export interface RoleDto {
    id: string;
    roleName?: string;
}

export interface MemberDto {
    id: string;
    staff: StaffDto | null;
    role: RoleDto | null;
    assignmentType?: string | null;
    isActive: boolean;
    assignedAt?: Date;
}

export interface CreateMemberDto {
    roleId: string;
    staffId: string;
}

export interface CreateEncounterAssignmentDto {
    transactionNumber: string;
    assignedTypeId?: string;
    members: CreateMemberDto[];
    user: string | null;
}

export interface CreateEncounterAssignmentResponseDto {
    assignmentId: string;
    assignedTypeName?: string | null;
    transactionNumber: string;
    members: MemberDto[];
}

export interface AssignUsersGroup {
    roleId: string;
    roleName: string;
    staffs: StaffDto[];
}

export interface AssignRoles {
    id: string;
    roleName: string;
}

export interface GetAssigneeDto {
    transactionNumber: string;
    assignmentId: string | null;
    members: MemberDto[];
}
